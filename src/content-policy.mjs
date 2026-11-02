/** @param {unknown} value @param {boolean} draft @returns {unknown} */
function visibleValue(value, draft) {
  if (Array.isArray(value))
    return value
      .map((item) => visibleValue(item, draft))
      .filter((item) => item !== undefined);
  if (value && typeof value === "object") {
    const record = /** @type {Record<string, unknown>} */ (value);
    if (!draft && "publication" in record && record.publication !== "approved")
      return undefined;
    return Object.fromEntries(
      Object.entries(record)
        .map(([key, item]) => [key, visibleValue(item, draft)])
        .filter(([, item]) => item !== undefined),
    );
  }
  return value;
}

/** @template T @param {T[]} records @param {boolean} draft @returns {T[]} */
export function forPublication(records, draft) {
  return /** @type {T[]} */ (visibleValue(records, draft));
}

/** @param {string} value */
export function escapeHtml(value) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ] ?? character,
  );
}

/** @param {string} value */
export function safeHref(value) {
  if (/^tel:\+[1-9]\d{6,14}$/.test(value)) return value;
  if (/^#[\w-]+$/.test(value)) return value;
  if (/^\/(?!\/)[a-zA-Z0-9/_.#-]*$/.test(value) && !value.includes(".."))
    return value;
  const url = new URL(value);
  if (
    !["https:", "mailto:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    /[\s\\]/.test(value)
  )
    throw new Error("Unsupported URL");
  return value;
}
