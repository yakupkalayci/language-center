import { Box, Flex } from "@chakra-ui/react";
import Header from "./header/Header";
import Footer from "./footer/Footer";

function DefaultLayout({ children }) {
  return (
    <Flex flexDirection="column" justifyContent="space-between" minH="100vh">
      <Header />
      <Box
        as="main"
        bgColor="#F8F9FA"
        flex="1 0 auto"
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default DefaultLayout;
