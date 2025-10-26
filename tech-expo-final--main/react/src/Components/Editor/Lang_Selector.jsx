import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "./constant.js";

const languages = Object.entries(LANGUAGE_VERSIONS);
const active_color = "blue.400";

const LangSelector = ({ language, onSelect, onRun, isTerminalOpen, isLoading }) => {
  return (
    <Box ml={2} mb={2}>
      <Flex align="center" gap={3}>
        {/* Language label + dropdown */}
        <Flex align="center" gap={2}>
          <Text fontSize="lg">Language :</Text>
          <Menu isLazy>
            <MenuButton as={Button} variant="outline" size="sm">
              {language}
            </MenuButton>
            <MenuList bg="#110c1b">
              {languages.map(([lang, version]) => (
                <MenuItem
                  key={lang}
                  color={lang === language ? active_color : "white"}
                  bg={lang === language ? "gray.700" : "transparent"}
                  _hover={{
                    color: active_color,
                    bg: "yellow.800",
                  }}
                  onClick={() => onSelect(lang)}
                >
                  {lang}
                  &nbsp;
                  <Text as="span" color="gray.400" fontSize="sm">
                    ({version})
                  </Text>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>

        {/* Run Button */}
        <Button
          colorScheme="green"
          size="sm"
          onClick={onRun}
          isLoading={isLoading}
        >
          {isTerminalOpen ? "Close Terminal" : "Run Code"}
        </Button>
      </Flex>
    </Box>
  );
};

export default LangSelector;

