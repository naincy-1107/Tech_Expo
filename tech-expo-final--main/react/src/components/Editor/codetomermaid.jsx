/**
 * src/astToMermaid.js
 * Convert JS source code -> Mermaid flowchart
 * Handles if/else, loops, functions, variables, returns, and generic calls.
 */
export function CodeToMermaid(code) {
  if (!code || code.trim() === "") {
    return `flowchart TD
start((Start))
end((End))
start --> end`;
  }

  let idCounter = 0;
  const nodes = [];
  const edges = [];

  const getId = (prefix = "n") => `${prefix}${++idCounter}`;

  const escapeLabel = (s = "") =>
    String(s)
      .replace(/\n/g, " ")
      .replace(/"/g, "'")
      .replace(/[{}()\[\]]/g, "")
      .trim();

  const addNode = (id, label, shape = "rect") => {
    const L = escapeLabel(label);
    if (shape === "diamond") nodes.push(`${id}{${L}}`);
    else if (shape === "round") nodes.push(`${id}((${L})
