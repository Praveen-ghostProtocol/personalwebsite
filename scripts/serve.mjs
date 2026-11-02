import http from "node:http";
import path from "node:path";
import { readFile, stat } from "node:fs/promises";
import { watch } from "node:fs";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { build, root } from "./build.mjs";

const draft = process.argv.includes("--draft");
const result = await build(draft);
let notFoundPage = await readFile(path.join(result.output, "404.html"));
const runFile = promisify(execFile);
const port = Number(
  process.argv.find((a) => a.startsWith("--port="))?.slice(7) ?? 4321,
);
/** @type {Record<string,string>} */
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
};
const server = http.createServer(async (req, res) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Robots-Tag", "noindex, nofollow");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'none'; img-src 'self'; style-src 'self'; script-src 'self'; font-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  );
  res.setHeader("Cache-Control", "no-store");
  if (!["GET", "HEAD"].includes(req.method ?? "")) {
    res.writeHead(405, { Allow: "GET, HEAD" });
    res.end();
    return;
  }
  try {
    const raw = decodeURIComponent((req.url ?? "/").split("?")[0]);
    if (raw.includes("..") || raw.includes("\\") || raw.includes("\0"))
      throw new Error("Invalid path");
    let file = path.resolve(result.output, "." + raw);
    if (!file.startsWith(result.output + path.sep) && file !== result.output)
      throw new Error("Invalid path");
    const info = await stat(file);
    if (info.isDirectory()) file = path.join(file, "index.html");
    const bytes = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] ?? "application/octet-stream",
    });
    res.end(req.method === "HEAD" ? undefined : bytes);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(req.method === "HEAD" ? undefined : notFoundPage);
  }
});
server.listen(port, "127.0.0.1", () =>
  console.log(
    `Local: http://127.0.0.1:${port}/ · ${draft ? "asset preview" : "release preview"} · loopback only`,
  ),
);
let pending = false;
let queued = false;
async function rebuild() {
  if (pending) {
    queued = true;
    return;
  }
  pending = true;
  try {
    // A fresh process reloads edited content modules instead of reusing the ESM cache.
    const { stdout } = await runFile(
      process.execPath,
      [path.join(root, "scripts/build.mjs"), ...(draft ? ["--draft"] : [])],
      { cwd: root, windowsHide: true },
    );
    console.log(stdout.trim());
    notFoundPage = await readFile(path.join(result.output, "404.html"));
  } catch (error) {
    console.error("Build error:", error);
  } finally {
    pending = false;
    if (queued) {
      queued = false;
      await rebuild();
    }
  }
}
/** @type {NodeJS.Timeout | undefined} */
let timer;
function scheduleBuild() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    void rebuild();
  }, 120);
}
const watchers = ["src", "assets"].map((folder) =>
  watch(path.join(root, folder), { recursive: true }, scheduleBuild),
);
try {
  watchers.push(
    watch(path.join(root, ".private/review-content.json"), scheduleBuild),
  );
} catch {
  /* Draft content is optional. */
}
function stop() {
  clearTimeout(timer);
  for (const watcher of watchers) watcher.close();
  server.close();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
