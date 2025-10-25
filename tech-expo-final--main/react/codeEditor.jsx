import React, { useRef, useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import Lang_selector from './Lang_selector';
import Flowchart from './Flowchart.jsx';
import { CODE_SNIPPETS } from './constant.js';
import { executeCode } from './api.js';

// Define the default language used for initialization
const DEFAULT_LANGUAGE = 'javascript';

const Codeeditor = () => {
  const editorRef = useRef();
  // FIX 1: Initialize value with the default language's snippet
  const [value, setValue] = useState(CODE_SNIPPETS[DEFAULT_LANGUAGE] || '');
  // Initialize language with the default language
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [showTerminal, setShowTerminal] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Flowchart data is derived from 'value' via useEffect, so we keep this state.
  const [flowData, setFlowData] = useState(CODE_SNIPPETS[DEFAULT_LANGUAGE] || '');
  const toast = useToast();
  // State for editor loading (addressing Issue 4)
  const [isEditorLoading, setIsEditorLoading] = useState(true);

  // Run code in terminal
  const runCode = async () => {
    const sourceCode = value;
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));
      
      // Update flowchart when code runs (redundant due to useEffect, but harmless)
      setFlowData(sourceCode); 
    } catch (error) {
      toast({
        title: 'An error occurred.',
        description: error.message || 'Unable to run code',
        status: 'error',
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set editor ref on mount and indicate loading is complete
  const on_mount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    // Resolve Issue 4: Editor is mounted and ready
    setIsEditorLoading(false); 
  };

  // Handle language selection
  const on_Select = (lang) => {
    // Ensure the language is stored as lowercase for consistency (Monaco and the API likely expect it)
    const lowerLang = lang.toLowerCase();
    setLanguage(lowerLang);
    setValue(CODE_SNIPPETS[lowerLang] || '');
  };

  // Update flowchart live as user types
  // This is better than triggering it only on 'run' for a live flow preview.
  useEffect(() => {
    setFlowData(value);
  }, [value]);

  return (
    <Box display="flex" w="100%" h="100vh">
      {/* Left side: Code Editor */}
      <Box w="50%" h="100%" p={2}>
        <Lang_selector
          language={language}
          onselect={on_Select}
          onRun={() => {
            runCode();
            // Toggle terminal *after* attempting to run code
            setShowTerminal(true); // Always show terminal on run for immediate feedback
          }}
          isLoading={isLoading}
          isTerminalOpen={showTerminal}
        />

        <Editor
          height="70vh"
          width="100%"
          theme="vs-dark"
          // FIX 3: Use 'language' state directly (already lowercase)
          language={language} 
          // FIX 2: Added fallback for defaultValue
          defaultValue={CODE_SNIPPETS[language] || CODE_SNIPPETS[DEFAULT_LANGUAGE]}
          value={value}
          onChange={(val) => setValue(val)}
          onMount={on_mount}
          // FIX 4: Show a message while editor is loading
          loading={isEditorLoading ? 'Loading Editor...' : undefined} 
        />

        {showTerminal && (
          <Box
            mt={2}
            w="100%"
            h="25vh"
            bg="black"
            color="green.300"
            p={4}
            fontFamily="monospace"
            overflowY="auto"
            borderTop="2px solid gray"
          >
            {output
              ? output.map((line, i) => <p key={i}>{line}</p>)
              : 'Click "Run Code" to see the output here'}
          </Box>
        )}
      </Box>

      {/* Right side: Flowchart */}
      <Box w="50%" h="100%" p={2} overflowY="auto">
        {/* Pass the code, which is being updated live via 'value' */}
        <Flowchart code={flowData} /> 
      </Box>
    </Box>
  );
};

export default Codeeditor;
