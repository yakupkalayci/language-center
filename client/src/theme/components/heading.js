import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const pageTitle = defineStyle({
  fontSize: ["20px", null, null, "32px"],
  marginBottom: {
    base: "16px",
    lg: "36px",
  },
  bgClip: "text",
  textFillColor: "transparent",
  bgGradient:
    "linear-gradient(90deg, rgba(10,81,173,1) 0%, rgba(232,150,150,1) 140%)",
});

export const headingTheme = defineStyleConfig({
  variants: { pageTitle },
});
