import { Box, ChakraProvider } from "@chakra-ui/react";
import Codeeditor from './Editor/Codeeditor'
import theme from './Editor/theme'

const Visualizer = () => {
  return (

    <ChakraProvider theme={theme}>
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={2}>
      <Codeeditor />
    </Box>

    </ChakraProvider>

  );
};

export default Visualizer;
