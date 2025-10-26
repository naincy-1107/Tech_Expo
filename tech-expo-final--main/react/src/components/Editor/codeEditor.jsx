import React, { useRef, useState, useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import LangSelector from "./LangSelector"; // ✅ fixed name for consistency
import Flowchart from "./Flowchart.jsx";
import { CODE_SNIPPETS } from "./constant.js";
import { executeCode } from "./api.js";

const DEFAULT_LANGUAGE = "javascript";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS[DEFAULT_LANGUAGE] || "");
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [showTerminal, setShowTerminal] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flowData, setFlowData] = useState(CODE_SNIPPETS[DEFAULT_LANGUAGE] || "");
  const [isEditorLoading, setIsEditorLoading] = useState(true);
  const toast = useToast();

  // 🧠 Run code via API
  const runCode = async () => {
    if (!value.
