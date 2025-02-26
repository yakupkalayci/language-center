import { Box, Flex } from "@chakra-ui/react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import { useLocation } from "react-router";

function DefaultLayout({ children }) {
  const location = useLocation();
  const isAuthPageActive = location.pathname === "/uyelik-islemleri";

  return (
    <Flex flexDirection="column" justifyContent="space-between" minH="100vh">
      <Header />
      <Box
        as="main"
        bgColor="#F8F9FA"
        flex="1 0 auto"
        display={isAuthPageActive ? "flex" : "block"}
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}

export default DefaultLayout;
