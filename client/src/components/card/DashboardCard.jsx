import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import WordList from "../list/WordList";

function DashboardCard(props) {
  // destruct props
  const { cardInfo } = props;
  const { title, type, link } = cardInfo;

  const getIconName = () => {
    switch (type) {
      case "day":
        return "calendar-day";
      case "week":
        return "calendar-week";
      case "month":
        return "calendar-month";
      case "video":
        return "video-library";
    }
  };

  const getData = (type) => {
    const data = {
      headings: [
        "Kelime",
        "Açıklama",
        "Telaffuz",
      ],
      body: [
        {
          data: [
            "scholl",
            "okul",
            "",
          ],
        },
        {
          data: [
            "money",
            "para",
            "",
          ],
        },
      ],
    };
    return data;
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
      <Flex
        marginBottom="16px"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex alignItems="center" gap="12px">
          <Box
            as="i"
            className={`icon-${getIconName()}`}
            color="base.black"
            fontSize="24px"
          />
          <Text fontWeight="700">{title}</Text>
        </Flex>
        <NavLink to={link}>
          <Text
            bgClip="text"
            textFillColor="transparent"
            bgGradient="linear-gradient(270deg, rgba(127,105,136,1) 0%, rgba(8,10,121,1) 120%)"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-5px)",
            }}
          >
            Sayfaya Git
          </Text>
        </NavLink>
      </Flex>
      <WordList type={type} data={getData()} />
    </Box>
  );
}

export default DashboardCard;
