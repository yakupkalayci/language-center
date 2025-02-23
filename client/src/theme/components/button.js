import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
    bgColor: "primary.tinBlue",
    color: "secondary.white"
  });

const secondary = defineStyle({
  bgColor: "primary.pink",
  color: "secondary.white"
});



export const buttonTheme = defineStyleConfig({
  variants: { primary, secondary },
});
