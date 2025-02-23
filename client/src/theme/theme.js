import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { buttonTheme } from "./components/button";

const theme = extendTheme({
  breakpoints: {
    base: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    '2xl': '1440px',
  },
  fonts: {
    heading: "'Delicious Handrawn', cursive",
    body: "'Work Sans', cursive"
  },
  colors,
  components: {
    Button: buttonTheme
  }
});

export default theme;
