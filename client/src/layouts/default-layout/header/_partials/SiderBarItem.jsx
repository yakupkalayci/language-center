import { Flex, Box, Text } from "@chakra-ui/react";

function SiderBarItem(props) {
  // destruct props
  const { iconName, label, isActive } = props;

  return (
    <Flex
      alignItems="center"
      gap="16px"
      padding="16px 24px 16px 16px"
      borderRadius="24px"
      textDecoration="none"
      color="base.black"
      _hover={{
        textDecoration: "none",
        outline: isActive ? "" : "1px solid",
        outlineColor: "borderColors.darkBlue",
        color: "borderColors.darkBlue",
        ".blueBorder": {
          color: "borderColors.darkBlue",
        },
      }}
      bgColor={isActive ? "primary.lilac" : ""}
    >
      <Box
        as="i"
        className={`icon-${iconName} blueBorder`}
        color="base.black"
        fontSize="24px"
      />
      <Text fontWeight="600">{label}</Text>
    </Flex>
  );
}

export default SiderBarItem;
