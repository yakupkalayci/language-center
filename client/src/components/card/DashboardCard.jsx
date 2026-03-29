import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";
import WordList from "../list/WordList";
import useDashboardCard from "../../hooks/useDashboardCards";
import Icon from "../common/Icon";

function DashboardCard(props) {
  // destruct props
  const { cardInfo } = props;
  const { title, type, link } = cardInfo;

  // variables
  const headings = ["Kelime", "Açıklama", "Telaffuz"];

  // hooks
  const {isLoading, error, data, retry} = useDashboardCard(type);

  // methods
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
      height={"100%"}
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
          <Flex
            alignItems={"center"}
            gap="8px"
            _hover={{
              transform: "translateY(-5px)",
            }}
            transition="all 0.3s ease"
          >
            <Text
              bgClip="text"
              textFillColor="transparent"
              bgGradient="linear-gradient(270deg, rgba(127,105,136,1) 0%, rgba(8,10,121,1) 120%)"
              display={{ base: "none", md: "block" }}
            >
              Sayfaya Git
            </Text>
            <Icon icon="arrow-right" size="24px" />
          </Flex>
        </NavLink>
      </Flex>
      <WordList type={type} data={data} headings={headings} loading={isLoading} error={error} retry={retry} />
    </Box>
  );
}

export default DashboardCard;
