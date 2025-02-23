import { Box, Heading, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router";

function Footer() {
  return (
    <Box
      as="footer"
      padding={{ base: "16px", lg: "32px" }}
      bgColor="rgb(94,0,152)"
      bg="linear-gradient(360deg, rgba(94,0,152,1) 0%, rgba(255,193,193,1) 120%)"
    >
      <Flex
        gap={{ base: "24px", lg: "48px" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Heading
          as="h1"
          color="secondary.white"
          fontSize={{ base: "24px", lg: "36px" }}
          sx={{
            textWrap: "nowrap",
          }}
        >
          Language Center
        </Heading>
        <Flex direction="column" alignItems="flex-end" marginLeft={{lg: 'auto'}} w={{lg: '50%', '2xl': '40%'}}>
          <Text color="secondary.white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos
            similique dolorum quibusdam, labore nihil mollitia earum non facilis
            cum quod perferendis possimus necessitatibus quidem dolorem
            exercitationem aut assumenda doloribus neque?
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems={{ base: "flex-start", lg: "center" }}
            marginTop="24px"
            direction={{ base: "column", sm: "row" }}
            w="100%"
            gap="8px"
          >
            <NavLink to="/hakkimizda">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                Hakkımızda
              </Text>
            </NavLink>
            <NavLink to="/nasil-calisir">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                Nasıl Çalışır?
              </Text>
            </NavLink>
            <NavLink to="/sik-sorulan-sorular">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                Sık Sorulan Sorular
              </Text>
            </NavLink>
            <NavLink to="/iletisim">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                İletişim
              </Text>
            </NavLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
