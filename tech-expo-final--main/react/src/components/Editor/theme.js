// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",   // 👈 Default color mode
  useSystemColorMode: false,  // 👈 Don’t auto-detect system theme
};

const theme = extendTheme({ config });

export default theme;
