// src/astToMermaid.js - Corrected and Complete version

/**
 * Convert JS source code -> mermaid flowchart string
 * Handles if/else, loops, functions, variables, and basic statements
 */
export function CodeToMermaid(code) {
  if (!code || code.trim() === '') {
    return `flowchart TD\nstart((Start))\nend((End))\nstart --> end`;
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
    else if (shape === "round") nodes.push(`${id}((${L}))`);
    else nodes.push(`${id}[${L}]`);
  };

  const addEdge = (from, to, label) => {
    if (!from || !to) return;
    if (label) edges.push(`${from} -->|${escapeLabel(label)}| ${to}`);
    else edges.
