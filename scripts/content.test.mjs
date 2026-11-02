import test from "node:test";
import assert from "node:assert/strict";
import {
  forPublication,
  escapeHtml,
  safeHref,
} from "../src/content-policy.mjs";

test("public filtering happens before rendering, including nested media and links", () => {
  const records = [
    { publication: "draft", title: "PRIVATE_CANARY" },
    {
      publication: "approved",
      title: "Public",
      media: [
        { publication: "draft", src: "/secret.png" },
        { publication: "approved", src: "/portrait.png" },
      ],
      links: [{ publication: "draft", href: "/private.pdf" }],
      deck: { publication: "draft", href: "/secret.pdf" },
    },
  ];
  const visible = forPublication(records, false);
  assert.equal(visible.length, 1);
  assert.doesNotMatch(JSON.stringify(visible), /PRIVATE_CANARY|secret|private/);
  assert.equal(visible[0].media?.length, 1);
  assert.equal(forPublication(records, true).length, 2);
  assert.equal(records[1].media?.length, 2);
});

test("editable strings are escaped and unsafe URLs are rejected", () => {
  assert.equal(escapeHtml('<script>"&'), "&lt;script&gt;&quot;&amp;");
  for (const input of [
    "javascript:alert(1)",
    "//evil.test",
    "/%2f/evil",
    "data:text/html,test",
    "https://user:secret@example.com",
    "/\\evil",
  ]) {
    assert.throws(() => safeHref(input));
  }
  for (const input of [
    "/work/weave/",
    "https://github.com/Praveen-ghostProtocol",
    "mailto:s4spraveen.2005@gmail.com",
    "#sports",
  ])
    assert.equal(safeHref(input), input);
});
