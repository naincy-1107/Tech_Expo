// src/Flowchart.jsx
import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";
import { CodeToMermaid } from "./CodeToMermaid";
import { Box, Text } from "@chakra-ui/react";

// ✅ Initialize Mermaid globally with a consistent theme
mermaid.initialize({
  startOnLoad: false,
  theme: "dark", // 'neutral' can also be used for better light/dark balance
  securityLevel: "loose", // allows inline styles (safe for trusted inputs)
});

const Flowchart = ({ code }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const debounceDelay = 500;

    const handle = setTimeout(async () => {
      if (!containerRef.current) return;

      // 🧹 Clear old SVG content
      containerRef.current.innerHTML = "";

      try {
        // ✅ Convert user code → Mermaid diagram
        const diagram = CodeToMermaid(code || "");
        if (!diagram || typeof diagram !== "string") {
          throw new Error("Invalid Mermaid diagram generated");
        }

        // ✅ Generate a unique ID for each render
        const id = `flow_${Math.random().toString(36).slice(2, 9)}`;

        // ✅ Render the SVG via Mermaid API
        const { svg } = await mermaid.render(id, diagram);

        if (!isCancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error("Mermaid render error:", err);
          setError(err.message || "Unknown rendering error");
          if (containerRef.current) containerRef.current.innerHTML = "";
        }
      }
    }, debounceDelay);

    // ✅ Cleanup on unmount or re-render
    return () => {
      isCancelled = true;
      clearTimeout(handle);
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [code]);

  return (
    <Box>
      {error && (
        <Text color="red.400" mb={2} fontSize="sm">
          Mermaid Render Error: {error}
        </Text>
      )}
      <div ref={containerRef} />
    </Box>
  );
};

export default Flowchart;
