import { defineStyleConfig } from "@chakra-ui/react";

export const containerTheme = defineStyleConfig({
  baseStyle: {
    maxW: {
      base: "100%",
      sm: "100%",
      md: "100%",
      lg: "960px",
      xl: "1160px",
      "2xl": "1344px",
    },
    padding: {
      base: '16px',
      lg: '48px 0'
    }
  },
});
