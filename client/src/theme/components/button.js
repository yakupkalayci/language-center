import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
    bgColor: "primary.tinBlue",
    color: "secondary.white"
  });

const secondary = defineStyle({
  bgColor: "primary.pink",
  color: "secondary.white"
});


const primaryAlert = defineStyle({
  bgColor: "primary.blue",
  color: "base.white"
});

const danger = defineStyle({
  bgColor: "alert.danger2",
  color: "base.white"
})


export const buttonTheme = defineStyleConfig({
  variants: { primary, secondary, primaryAlert, danger },
});
