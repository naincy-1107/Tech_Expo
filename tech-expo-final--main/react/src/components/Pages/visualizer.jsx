import { Box, ChakraProvider } from "@chakra-ui/react";
import Codeeditor from "./Editor/Codeeditor";
import theme from "./Editor/theme";

const Visualizer = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box
        minH="100vh"
        bg="#0f0a19"
        color="gray.200"
        px={6}
        py={4}
        display="flex"
        flexDirection="column"
      >
        <Codeeditor />
      </Box>
    </ChakraProvider>
  );
};

export default Visualizer;
