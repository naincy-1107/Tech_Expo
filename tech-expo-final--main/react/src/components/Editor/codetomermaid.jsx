// src/astToMermaid.js - Corrected and Improved version

/**
 * Convert JS source code -> mermaid flowchart string
 * Improved version that better handles code blocks and structure
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
      // Remove only braces and brackets, but keep <, >, <=, >=
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
    else edges.push(`${from} --> ${to}`);
  };

  // Process a single statement/expression
  const processStatement = (stmt, currentNode) => {
    // Only process non-empty statements
    if (!stmt || stmt.trim() === '') return currentNode; 

    // Heuristics for different statement types
    if (stmt.includes('console.log')) {
      const match = stmt.match(/console\.log\s*\((.+?)\)/);
      const arg = match ? match[1] : '';
      const id = getId("log");
      addNode(id, `Log: ${arg}`);
      addEdge(currentNode, id);
      return id;
    } else if (stmt.includes('(') && stmt.includes(')')) {
      const id = getId("call");
      const shortStmt = stmt.length > 25 ? stmt.substring(0, 25) + '...' : stmt;
      addNode(id, `Call: ${shortStmt}`);
      addEdge(currentNode, id);
      return id;
    } else {
      const id = getId("stmt");
      const shortStmt = stmt.length > 25 ? stmt.substring(0, 25) + '...' : stmt;
      addNode(id, `Execute: ${shortStmt}`);
      addEdge(currentNode, id);
      return id;
    }
  };


  // Tokenize code into meaningful blocks
  const tokenizeCode = (code) => {
    const lines = code.split('\n').map(line => line.trim());
    const tokens = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // Skip comments, empty lines, and standalone braces
      if (line.startsWith('//') || line.startsWith('/*') || line === '' || line === '{' || line === '}') {
        i++;
        continue;
      }
      
      // Standalone 'else' is handled as part of 'if' logic, but we skip it here if it's not immediately followed by '{'
      if (line.match(/^\s*else\s*$/)) {
          i++;
          continue;
      }
      
      // Function declarations
      if (line.match(/^\s*function\s+\w+/)) {
        const match = line.match(/function\s+(\w+)/);
        const funcName = match ? match[1] : 'anonymous';
        tokens.push({ type: 'function', name: funcName, line });
        i++;
      }
      // If statements (with block parsing)
      else if (line.match(/^\s*if\s*\(/)) {
        const condition = line.match(/if\s*\(([^)]+)\)/)?.[1] || 'condition';
        const ifBlock = { type: 'if', condition, thenBlock: [], elseBlock: [] };

        i++; // Move past if line

        // Parse then block
        if (lines[i] === '{') {
          i++; // Skip opening brace
          while (i < lines.length && lines[i] !== '}') {
            if (lines[i].trim() && lines[i].trim() !== '}') {
              ifBlock.thenBlock.push(lines[i]);
            }
            i++;
          }
          i++; // Skip closing brace
        } else if (lines[i] && !lines[i].match(/^\s*else\s*$/)) {
          // Single line if (must not be the start of else)
          ifBlock.thenBlock.push(lines[i]);
          i++;
        }
        
        // Check for else
        if (lines[i] && lines[i].match(/^\s*else\s*$/)) {
          i++; // Move past else
          if (lines[i] === '{') {
            i++; // Skip opening brace
            while (i < lines.length && lines[i] !== '}') {
              if (lines[i].trim() && lines[i].trim() !== '}') {
                ifBlock.elseBlock.push(lines[i]);
              }
              i++;
            }
            i++; // Skip closing brace
          } else if (lines[i]) {
            // Single line else
            ifBlock.elseBlock.push(lines[i]);
            i++;
          }
        }

        tokens.push(ifBlock);
      }
      // For/While loops (simplified for block processing)
      else if (line.match(/^\s*(for|while)\s*\(/)) {
        const loopType = line.match(/^\s*(for|while)\s*\(/)?.[1];
        const loopContent = line.match(/\s*(for|while)\s*\(([^)]+)\)/)?.[2] || '';
        const loopBlock = { type: loopType, condition: loopContent, body: [] };
        
        i++; // Move past loop line

        if (lines[i] === '{') {
          i++; // Skip opening brace
          while (i < lines.length && lines[i] !== '}') {
            if (lines[i].trim() && lines[i].trim() !== '}') {
              loopBlock.body.push(lines[i]);
            }
            i++;
          }
          i++; // Skip closing brace
        } else if (lines[i]) {
          // Single line loop
          loopBlock.body.push(lines[i]);
          i++;
        }
        
        tokens.push(loopBlock);
      }
      // Variable declarations
      else if (line.match(/^\s*(let|const|var)\s+/)) {
        // Capture the declaration/assignment for the label
        const varInfo = line.replace(/;?\s*$/, '');
        tokens.push({ type: 'variable', content: varInfo, line });
        i++;
      }
      // Return statements
      else if (line.match(/^\s*return\b/)) {
        const returnValue = line.replace(/^\s*return\s*/, '').replace(/;?\s*$/, '');
        tokens.push({ type: 'return', value: returnValue || 'void', line });
        i++;
      }
      // Everything else as a general statement/call
      else {
        tokens.push({ type: 'statement', content: line, line });
        i++;
      }
    }

    return tokens;
  };

  try {
    const tokens = tokenizeCode(code);

    const start = getId("start");
    addNode(start, "Start", "round");
    let currentNode = start;

    for (const token of tokens) {
      switch (token.type) {
        case 'function': {
          const id = getId("fn");
          addNode(id, `Function: ${token.name}`, "round");
          addEdge(currentNode, id);
          currentNode = id;
          break;
        }

        case 'if': {
          const condId = getId("if");
          const cleanCondition = token.condition.replace(/[()]/g, "").trim();
          addNode(condId, `if ${cleanCondition}`, "diamond");
          addEdge(currentNode, condId); // Connect previous
