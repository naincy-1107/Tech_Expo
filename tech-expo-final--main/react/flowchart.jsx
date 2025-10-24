
// src/Flowchart.jsx
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { CodeToMermaid } from "./Codetomermaid";
import { Box, Text } from "@chakra-ui/react";

// Initialize mermaid once globally
mermaid.initialize({ startOnLoad: false, theme: "dark" });

const Flowchart = ({ code }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const handle = setTimeout(() => {
      (async () => {
        try {
          const diagram = CodeToMermaid(code || "");
          const id = "flow_" + Math.random().toString(36).slice(2, 9);

          const { svg } = await mermaid.render(id, diagram);

          if (!isCancelled && containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
          setError(null);
        } catch (err) {
          if (!isCancelled) {
            setError(err.message || String(err));
            if (containerRef.current) containerRef.current.innerHTML = "";
          }
        }
      })();
    }, 350); // debounce

    return () => {
      isCancelled = true;
      clearTimeout(handle);
    };
  }, [code]);

  return (
    <Box>
      {error && (
        <Text color="red.400" mb={2}>
          Parse error: {error}
        </Text>
      )}
      <div ref={containerRef} />
    </Box>
  );
};

export default Flowchart;
