
// import { Box, useToast } from '@chakra-ui/react'
// import React, { useRef, useState } from 'react'
// import { Editor } from '@monaco-editor/react'
// import Lang_selector from './Lang_selector'

// import {CODE_SNIPPETS} from './constant.js'
// import { executeCode } from './api.js'

// const Codeeditor = () => {
//   const editorRef = useRef()
//   const [value, setValue] = useState('')
//   const [language, setLanguage] = useState('Javascript')
//   const [showTerminal, setShowTerminal] = useState(false)
//   const [output, setOutput] = useState(null);
//   const [isLoading, setIsLoading] = useState(false)
//   const toast= useToast();
//   const runCode = async ()=>{
//     const sourceCode = value;
//     if(!sourceCode)  return;
//     try {
//       setIsLoading(true)
//       const {run: result}= await executeCode(language,sourceCode)
//       setOutput(result.output.split("\n"))
      
//     } catch (error) {
//             toast({
//         title: "An error occurred.",
//         description: error.message || "Unable to run code",
//         status: "error",
//         duration: 6000,
//       });
//     }
//     finally{
//       setIsLoading(false);
//     }
//   }

//   const on_mount = (editor) => {
//     editorRef.current = editor
//     editor.focus()
//   }

//   const on_Select = (language) => {
//     setLanguage(language)
//     setValue(CODE_SNIPPETS[language])
//   }

//   return (
//     <Box position="relative" w="100%" h="100%">
//       {/* Language Selector + Run Button */}
//    <Lang_selector 
//   language={language} 
//   onselect={on_Select} 
//     onRun={() => {
//     runCode()
//     setShowTerminal(!showTerminal)  // ✅ toggle terminal state
//   }}
//   isLoading={isLoading}
//   isTerminalOpen={showTerminal}
// />

//       {/* Editor */}
//       <Editor
//         height="85vh"
//         width="50%"
//         theme="vs-dark"
//         language={language}
//         defaultValue={CODE_SNIPPETS[language]}
//         value={value}
//         onChange={(val) => setValue(val)}
//         onMount={on_mount}
//       />

//       {/* Terminal */}
//       {showTerminal && (   //if showTerminal ==true then react renders the box
//         <Box
//           position="absolute"
//           bottom="0"
//           left="0"
//           width="49%"
//           height="40%"
//           bg="black"
//           color="green.300"
//           p={4}
//           fontFamily="monospace"
//           overflowY="auto"
//           borderTop="2px solid gray"
//         >
//           {/* <p>$ Output will appear here...</p> */}
//         {output
//   ? output.map((line, i) => {
//       return <p key={i}>{line}</p>
//     })
//   : 'Click "Run Code" to see the output here'}

//         </Box>
//       )}
//     </Box>
//   )
// }

// export default Codeeditor


// 


import React, { useRef, useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Editor } from '@monaco-editor/react';
import Lang_selector from './Lang_selector';
import Flowchart from './Flowchart.jsx';
import { CODE_SNIPPETS } from './constant.js';
import { executeCode } from './api.js';

const Codeeditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('Javascript');
  const [showTerminal, setShowTerminal] = useState(false);
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flowData, setFlowData] = useState('');
  const toast = useToast();

  // Run code in terminal
  const runCode = async () => {
    const sourceCode = value;
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split('\n'));

      // Update flowchart when code runs
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

  // Set editor ref on mount
  const on_mount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Handle language selection
  const on_Select = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang] || '');
  };

  // Update flowchart live as user types
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
            setShowTerminal(!showTerminal);
          }}
          isLoading={isLoading}
          isTerminalOpen={showTerminal}
        />

        <Editor
          height="70vh"
          width="100%"
          theme="vs-dark"
          language={language.toLowerCase()}
          defaultValue={CODE_SNIPPETS[language]}
          value={value}
          onChange={(val) => setValue(val)}
          onMount={on_mount}
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
        <Flowchart code={value}  />
      </Box>
    </Box>
  );
};

export default Codeeditor;
