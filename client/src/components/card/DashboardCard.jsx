import { Box, Flex, Text } from "@chakra-ui/react";
import WordList from "../list/WordList";

function DashboardCard(props) {
  // destruct props
  const { title, type } = props;

  const getIconName = () => {
    switch (type) {
      case "day":
        return "calendar-day";
      case "week":
        return "calendar-week";
      case "month":
        return "calendar";
      case "video":
        return "video-library";
    }
  };

  return (
    <Box
      padding="24px"
      bgColor="base.white"
      borderRadius="8px"
      boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
      _hover={{
        boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
      }}
      transition="all 0.3s ease"
    >
      <Flex marginBottom="16px" alignItems="center" gap="12px">
        <Box
          as="i"
          className={`icon-${getIconName()}`}
          color="base.black"
          fontSize="24px"
        />
        <Text>{title}</Text>
      </Flex>
      <WordList />
    </Box>
  );
}

export default DashboardCard;
