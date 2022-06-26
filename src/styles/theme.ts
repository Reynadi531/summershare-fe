import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  intialColorMode: "light",
  useSystemColorMode: false,
  fonts: {
    body: "Inter, system-ui, sans-serif",
  },
  colors: {
    brand: "#FF7A00",
  },
});

export default theme;
