
// // src/astToMermaid.js
// // Using a simpler approach without heavy AST parsing for browser compatibility

// /**
//  * Convert JS source code -> mermaid flowchart string
//  * Uses regex-based parsing for browser compatibility
//  */
// export function CodeToMermaid(code) {
//   if (!code || code.trim() === '') {
//     return `flowchart TD\nstart((Start))\nend((End))\nstart --> end`;
//   }

//   let idCounter = 0;
//   const nodes = [];
//   const edges = [];

//   const getId = (prefix = "n") => `${prefix}${++idCounter}`;

//   const escapeLabel = (s = "") =>
//     String(s)
//       .replace(/\n/g, " ")
//       .replace(/"/g, "'")
//       .replace(/\[/g, "(")
//       .replace(/\]/g, ")")
//       .replace(/\{/g, "(")
//       .replace(/\}/g, ")")
//       .replace(/\(/g, "")
//       .replace(/\)/g, "")
//       .replace(/[<>]/g, "");

//   const addNode = (id, label, shape = "rect") => {
//     const L = escapeLabel(label);
//     if (shape === "diamond") nodes.push(`${id}{${L}}`);
//     else if (shape === "round") nodes.push(`${id}((${L}))`);
//     else nodes.push(`${id}[${L}]`);
//   };

//   const addEdge = (from, to, label) => {
//     if (!from || !to) return;
//     if (label) edges.push(`${from} -->|${escapeLabel(label)}| ${to}`);
//     else edges.push(`${from} --> ${to}`);
//   };

//   try {
//     // Split code into lines and process
//     const lines = code.split('\n').map(line => line.trim()).filter(line => line);
    
//     const start = getId("start");
//     addNode(start, "Start", "round");
//     let currentNode = start;

//     for (const line of lines) {
//       // Skip comments and empty lines
//       if (line.startsWith('//') || line.startsWith('/*') || line === '') {
//         continue;
//       }

//       // Function declarations
//       if (line.match(/^\s*function\s+\w+/)) {
//         const match = line.match(/function\s+(\w+)/);
//         const funcName = match ? match[1] : 'anonymous';
//         const id = getId("fn");
//         addNode(id, `Function: ${funcName}`, "round");
//         addEdge(currentNode, id);
//         currentNode = id;
//       }
//       // If statements
//       else if (line.match(/^\s*if\s*\(/)) {
//         const condition = line.match(/if\s*\(([^)]+)\)/)?.[1] || 'condition';
//         const id = getId("if");
//         const cleanCondition = condition.replace(/[()]/g, "").trim();
//         addNode(id, `if ${cleanCondition}`, "diamond");
//         addEdge(currentNode, id);
        
//         // Create branches
//         const yesId = getId("yes");
//         const noId = getId("no");
//         addNode(yesId, "Yes branch");
//         addNode(noId, "No branch");
//         addEdge(id, yesId, "yes");
//         addEdge(id, noId, "no");
        
//         // Join point
//         const joinId = getId("join");
//         addNode(joinId, "Continue");
//         addEdge(yesId, joinId);
//         addEdge(noId, joinId);
//         currentNode = joinId;
//       }
//       // For loops
//       else if (line.match(/^\s*for\s*\(/)) {
//         const id = getId("for");
//         addNode(id, "For Loop", "diamond");
//         addEdge(currentNode, id);
        
//         const bodyId = getId("body");
//         addNode(bodyId, "Loop Body");
//         addEdge(id, bodyId, "iterate");
//         addEdge(bodyId, id); // Loop back
        
//         const afterId = getId("after");
//         addNode(afterId, "After Loop");
//         addEdge(id, afterId, "done");
//         currentNode = afterId;
//       }
//       // While loops
//       else if (line.match(/^\s*while\s*\(/)) {
//         const condition = line.match(/while\s*\(([^)]+)\)/)?.[1] || 'condition';
//         const id = getId("while");
//         const cleanCondition = condition.replace(/[()]/g, "").trim();
//         addNode(id, `while ${cleanCondition}`, "diamond");
//         addEdge(currentNode, id);
        
//         const bodyId = getId("body");
//         addNode(bodyId, "Loop Body");
//         addEdge(id, bodyId, "true");
//         addEdge(bodyId, id); // Loop back
        
//         const afterId = getId("after");
//         addNode(afterId, "After Loop");
//         addEdge(id, afterId, "false");
//         currentNode = afterId;
//       }
//       // Variable declarations
//       else if (line.match(/^\s*(let|const|var)\s+/)) {
//         const match = line.match(/(let|const|var)\s+([^=;]+)/);
//         const varName = match ? match[2].trim() : 'variable';
//         const id = getId("var");
//         addNode(id, `Declare: ${varName}`);
//         addEdge(currentNode, id);
//         currentNode = id;
//       }
//       // Return statements
//       else if (line.match(/^\s*return\b/)) {
//         const id = getId("return");
//         const returnValue = line.replace(/^\s*return\s*/, '').replace(/;?\s*$/, '');
//         addNode(id, `Return: ${returnValue || 'void'}`);
//         addEdge(currentNode, id);
//         currentNode = id;
//       }
//       // Function calls or expressions
//       else if (line.includes('(') && line.includes(')')) {
//         const id = getId("call");
//         const shortLine = line.length > 30 ? line.substring(0, 30) + '...' : line;
//         addNode(id, `Call: ${shortLine}`);
//         addEdge(currentNode, id);
//         currentNode = id;
//       }
//       // General statements
//       else {
//         const id = getId("stmt");
//         const shortLine = line.length > 30 ? line.substring(0, 30) + '...' : line;
//         addNode(id, `Statement: ${shortLine}`);
//         addEdge(currentNode, id);
//         currentNode = id;
//       }
//     }

//     // Add end node
//     const end = getId("end");
//     addNode(end, "End", "round");
//     addEdge(currentNode, end);

//     return `flowchart TD\n${nodes.join("\n")}\n${edges.join("\n")}`;

//   } catch (err) {
//     // Return a minimal mermaid diagram that shows the parse error
//     const msg = escapeLabel(err.message || "parse error");
//     return `flowchart TD\nerr[Parse error: ${msg}]`;
//   }
// }




//      IMPROVED CODE FOR BETTER FLOW 
// src/astToMermaid.js - Improved version with better block handling

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

  // const escapeLabel = (s = "") =>
  //   String(s)
  //     .replace(/\n/g, " ")
  //     .replace(/"/g, "'")
  //     .replace(/[{}()\[\]<>]/g, "")
  //     .trim();

  const escapeLabel = (s = "") =>
  String(s)
    .replace(/\n/g, " ")
    .replace(/"/g, "'")
    // remove only braces and brackets, but keep <, >, <=, >=
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

  // Tokenize code into meaningful blocks
  const tokenizeCode = (code) => {
    const lines = code.split('\n').map(line => line.trim()).filter(line => line);
    const tokens = [];
    let i = 0;
    
    while (i < lines.length) {
      const line = lines[i];
      
      // Skip comments and empty lines
      if (line.startsWith('//') || line.startsWith('/*') || line === '') {
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
        if (i < lines.length && lines[i] === '{') {
          i++; // Skip opening brace
          while (i < lines.length && lines[i] !== '}') {
            if (lines[i].trim()) {
              ifBlock.thenBlock.push(lines[i]);
            }
            i++;
          }
          i++; // Skip closing brace
        } else if (i < lines.length) {
          // Single line if
          ifBlock.thenBlock.push(lines[i]);
          i++;
        }
        
        // Check for else
        if (i < lines.length && lines[i].match(/^\s*else\s*$/)) {
          i++; // Move past else
          if (i < lines.length && lines[i] === '{') {
            i++; // Skip opening brace
            while (i < lines.length && lines[i] !== '}') {
              if (lines[i].trim()) {
                ifBlock.elseBlock.push(lines[i]);
              }
              i++;
            }
            i++; // Skip closing brace
          } else if (i < lines.length) {
            // Single line else
            ifBlock.elseBlock.push(lines[i]);
            i++;
          }
        }
        
        tokens.push(ifBlock);
      }
      // For loops
      else if (line.match(/^\s*for\s*\(/)) {
        const loopContent = line.match(/for\s*\(([^)]+)\)/)?.[1] || '';
        const forBlock = { type: 'for', condition: loopContent, body: [] };
        
        i++; // Move past for line
        
        if (i < lines.length && lines[i] === '{') {
          i++; // Skip opening brace
          while (i < lines.length && lines[i] !== '}') {
            if (lines[i].trim()) {
              forBlock.body.push(lines[i]);
            }
            i++;
          }
          i++; // Skip closing brace
        } else if (i < lines.length) {
          // Single line for
          forBlock.body.push(lines[i]);
          i++;
        }
        
        tokens.push(forBlock);
      }
      // While loops
      else if (line.match(/^\s*while\s*\(/)) {
        const condition = line.match(/while\s*\(([^)]+)\)/)?.[1] || 'condition';
        const whileBlock = { type: 'while', condition, body: [] };
        
        i++; // Move past while line
        
        if (i < lines.length && lines[i] === '{') {
          i++; // Skip opening brace
          while (i < lines.length && lines[i] !== '}') {
            if (lines[i].trim()) {
              whileBlock.body.push(lines[i]);
            }
            i++;
          }
          i++; // Skip closing brace
        } else if (i < lines.length) {
          // Single line while
          whileBlock.body.push(lines[i]);
          i++;
        }
        
        tokens.push(whileBlock);
      }
      // Skip standalone braces and else keywords
      else if (line === '{' || line === '}' || line.match(/^\s*else\s*$/)) {
        i++;
      }
      // Variable declarations
      else if (line.match(/^\s*(let|const|var)\s+/)) {
        const match = line.match(/(let|const|var)\s+([^=;]+)/);
        const varInfo = match ? `${match[1]} ${match[2].trim()}` : line;
        tokens.push({ type: 'variable', content: varInfo, line });
        i++;
      }
      // Return statements
      else if (line.match(/^\s*return\b/)) {
        const returnValue = line.replace(/^\s*return\s*/, '').replace(/;?\s*$/, '');
        tokens.push({ type: 'return', value: returnValue || 'void', line });
        i++;
      }
      // Function calls
      else if (line.includes('(') && line.includes(')') && !line.includes('=')) {
        const funcCall = line.replace(/;?\s*$/, '');
        tokens.push({ type: 'call', content: funcCall, line });
        i++;
      }
      // Other statements
      else {
        tokens.push({ type: 'statement', content: line, line });
        i++;
      }
    }
    
    return tokens;
  };

  // Process a single statement/expression
  const processStatement = (stmt, currentNode) => {
    if (stmt.includes('console.log')) {
      const match = stmt.match(/console\.log\s*\(\s*(.+?)\s*\)/);
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
          addEdge(currentNode, condId);

          // Process then branch
          let thenCurrent = condId;
          for (const stmt of token.thenBlock) {
            thenCurrent = processStatement(stmt, thenCurrent);
          }
          if (token.thenBlock.length === 0) {
            const emptyId = getId("empty");
            addNode(emptyId, "No action");
            addEdge(condId, emptyId, "yes");
            thenCurrent = emptyId;
          } else {
            // Add edge label to first statement in then block
            const firstThenEdge = edges[edges.length - token.thenBlock.length];
            if (firstThenEdge && !firstThenEdge.includes('|yes|')) {
              edges[edges.length - token.thenBlock.length] = firstThenEdge.replace('-->', '-->|yes|');
            }
          }

          // Process else branch
          let elseCurrent = condId;
          for (const stmt of token.elseBlock) {
            elseCurrent = processStatement(stmt, elseCurrent);
          }
          if (token.elseBlock.length === 0) {
            const emptyId = getId("empty");
            addNode(emptyId, "No action");
            addEdge(condId, emptyId, "no");
            elseCurrent = emptyId;
          } else {
            // Add edge label to first statement in else block
            const firstElseEdge = edges[edges.length - token.elseBlock.length];
            if (firstElseEdge && !firstElseEdge.includes('|no|')) {
              edges[edges.length - token.elseBlock.length] = firstElseEdge.replace('-->', '-->|no|');
            }
          }

          // Join point
          const joinId = getId("join");
          addNode(joinId, "Continue");
          addEdge(thenCurrent, joinId);
          addEdge(elseCurrent, joinId);
          currentNode = joinId;
          break;
        }

        case 'for': {
          const loopId = getId("for");
          addNode(loopId, "For Loop", "diamond");
          addEdge(currentNode, loopId);

          // Process loop body
          let bodyCurrent = loopId;
          for (const stmt of token.body) {
            bodyCurrent = processStatement(stmt, bodyCurrent);
          }
          
          if (token.body.length === 0) {
            const emptyId = getId("empty");
            addNode(emptyId, "Empty loop");
            addEdge(loopId, emptyId, "iterate");
            bodyCurrent = emptyId;
          } else {
            // Add edge label to first statement in body
            const firstBodyEdge = edges[edges.length - token.body.length];
            if (firstBodyEdge && !firstBodyEdge.includes('|iterate|')) {
              edges[edges.length - token.body.length] = firstBodyEdge.replace('-->', '-->|iterate|');
            }
          }

          // Loop back
          addEdge(bodyCurrent, loopId);

          // After loop
          const afterId = getId("after");
          addNode(afterId, "After loop");
          addEdge(loopId, afterId, "done");
          currentNode = afterId;
          break;
        }

        case 'while': {
          const loopId = getId("while");
          const cleanCondition = token.condition.replace(/[()]/g, "").trim();
          addNode(loopId, `while ${cleanCondition}`, "diamond");
          addEdge(currentNode, loopId);

          // Process loop body
          let bodyCurrent = loopId;
          for (const stmt of token.body) {
            bodyCurrent = processStatement(stmt, bodyCurrent);
          }
          
          if (token.body.length === 0) {
            const emptyId = getId("empty");
            addNode(emptyId, "Empty loop");
            addEdge(loopId, emptyId, "true");
            bodyCurrent = emptyId;
          } else {
            // Add edge label to first statement in body
            const firstBodyEdge = edges[edges.length - token.body.length];
            if (firstBodyEdge && !firstBodyEdge.includes('|true|')) {
              edges[edges.length - token.body.length] = firstBodyEdge.replace('-->', '-->|true|');
            }
          }

          // Loop back
          addEdge(bodyCurrent, loopId);

          // After loop
          const afterId = getId("after");
          addNode(afterId, "After loop");
          addEdge(loopId, afterId, "false");
          currentNode = afterId;
          break;
        }

        case 'variable': {
          const id = getId("var");
          addNode(id, `Declare: ${token.content}`);
          addEdge(currentNode, id);
          currentNode = id;
          break;
        }

        case 'return': {
          const id = getId("return");
          addNode(id, `Return: ${token.value}`);
          addEdge(currentNode, id);
          currentNode = id;
          break;
        }

        case 'call': {
          currentNode = processStatement(token.content, currentNode);
          break;
        }

        default: {
          currentNode = processStatement(token.content, currentNode);
          break;
        }
      }
    }

    // Add end node
    const end = getId("end");
    addNode(end, "End", "round");
    addEdge(currentNode, end);

    return `flowchart TD\n${nodes.join("\n")}\n${edges.join("\n")}`;

  } catch (err) {
    console.error('Parse error:', err);
    const msg = escapeLabel(err.message || "parse error");
    return `flowchart TD\nerr[Parse error: ${msg}]`;
  }
}
