import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
// import theme from './component/Editor/theme.js' 
import theme from './Component/Editor/theme.js'


createRoot(document.getElementById("root")).render(
  <StrictMode>
  
      <BrowserRouter>
        <App />
      </BrowserRouter>
    
  </StrictMode>
);
