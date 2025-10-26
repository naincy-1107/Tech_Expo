import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// Use consistent casing (assuming the file path is lowercased 'component')
import theme from './Component/Editor/theme.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* CRITICAL FIX: Wrap the application with ChakraProvider and pass the custom theme */}
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>
);
