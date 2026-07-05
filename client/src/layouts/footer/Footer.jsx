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
          <Box as="a" href="/">
            Language Center
          </Box>
        </Heading>
        <Flex direction="column" alignItems="flex-end" marginLeft={{lg: 'auto'}} w={{lg: '50%', '2xl': '40%'}}>
          <Text color="secondary.white">
            <Text as="span" fontWeight={600}>My Language Center</Text> ile dil öğreniminizi dijital ortamda kolaylaştırın. Kendi hızınızda öğrenin, pratik yapın ve dil becerilerinizi geliştirin.
          </Text>
          <Flex
            justifyContent="space-between"
            alignItems={{ base: "flex-start", lg: "center" }}
            marginTop="24px"
            direction={{ base: "column", sm: "row" }}
            w="100%"
            gap="8px"
          >
            <Box as="a" href="#specs" >
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                Özellikler
              </Text>
            </Box>
            <Box as="a" href="#howto">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                Nasıl Kullanılır?
              </Text>
            </Box>
            <Box as="a" href="#contact">
              <Text
                as="span"
                color="primary.gray"
                _hover={{ color: "base.white" }}
              >
                İletişim
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
