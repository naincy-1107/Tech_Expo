// src/Flowchart.jsx
import React, { useEffect, useRef, useState } from "react";
// FIX 1: Corrected import path case to match the source file name
import mermaid from "mermaid";
import { CodeToMermaid } from "./CodeToMermaid"; 
import { Box, Text } from "@chakra-ui/react";

// Initialize mermaid once globally
// Using theme 'dark' as specified in the original code, but 'neutral' is often safer for embedding.
mermaid.initialize({ startOnLoad: false, theme: "dark" });

const Flowchart = ({ code }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    
    // FIX 2: Increased debounce delay for better performance (e.g., 500ms)
    const debounceDelay = 500; 
    
    const handle = setTimeout(() => {
      (async () => {
        // FIX 3: Clean up previous render before attempting a new one
        if (containerRef.current) {
            containerRef.current.innerHTML = "";
        }
        
        try {
          const diagram = CodeToMermaid(code || "");
          
          // Generate a unique ID for the mermaid rendering process
          const id = "flow_" + Math.random().toString(36).slice(2, 9);

          // Render the SVG
          const { svg } = await mermaid.render(id, diagram);

          if (!isCancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
          setError(null);
        } catch (err) {
          if (!isCancelled) {
            // Note: If CodeToMermaid returns a diagram with a parse error node, 
            // mermaid.render might still succeed. This only catches rendering errors.
            setError(err.message || String(err));
            if (containerRef.current) containerRef.current.innerHTML = "";
          }
        }
      })();
    }, debounceDelay); // Debounce

    return () => {
      isCancelled = true;
      clearTimeout(handle);
      // FIX 3: Cleanup hook to clear the container when component unmounts or effect reruns
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [code]);

  return (
    <Box>
      {error && (
        <Text color="red.400" mb={2}>
          Mermaid Render Error: {error}
        </Text>
      )}
      {/* Mermaid renders into this div */}
      <div ref={containerRef} />
    </Box>
  );
};

export default Flowchart;
