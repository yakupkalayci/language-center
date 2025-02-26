import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router";
import Drawer from "../../components/drawer/Drawer";
import SideBar from "./_partials/SideBar";

function Header() {
  const isLoggedIn = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  const navigteToLoginPage = () => {
    navigate("/uyelik-islemleri", { state: { formType: 'login' } });
  };

  const navigteToRegisterPage = () => {
    navigate("/uyelik-islemleri", { state: { formType: 'register' } });
  };

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname, onClose]);

  return (
    <Box
      as="header"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      bgColor="rgb(94,0,152)"
      bg="linear-gradient(90deg, rgba(94,0,152,1) 0%, rgba(255,193,193,1) 100%)"
    >
      <Flex
        align="center"
        position="relative"
        direction={!isLoggedIn ? { base: "column", md: "row" } : "row"}
        justifyContent="space-between"
        padding={{ base: "16px", lg: "32px" }}
        gap={!isLoggedIn ? { base: "12px", md: 0 } : "unset"}
      >
        {isLoggedIn && (
          <Box
            as="i"
            className="icon-menu-toggle"
            color="base.white"
            fontSize="20px"
            cursor="pointer"
            _hover={{
              color: "primary.gray",
            }}
            onClick={onOpen}
          />
        )}
        <Heading
          as="h1"
          position={{ md: "absolute" }}
          left="50%"
          transform={{ md: "translateX(-50%)" }}
          color="secondary.white"
          fontSize={{ base: "24px", lg: "36px" }}
        >
          Language Center
        </Heading>
        {isLoggedIn && (
          <Box
            as="i"
            className="icon-profile"
            color="base.white"
            fontSize="24px"
            cursor="pointer"
            _hover={{
              color: "primary.gray",
            }}
          />
        )}
        {!isLoggedIn && (
          <>
            <Spacer />
            <ButtonGroup gap="2" display={isLoggedIn ? "none" : "block"}>
              <Button variant="secondary" onClick={navigteToRegisterPage}>Sign Up</Button>
              <Button variant="primary" onClick={navigteToLoginPage}>Log in</Button>
            </ButtonGroup>
          </>
        )}
      </Flex>
      <Drawer
        size={{ base: "full", md: "md" }}
        onClose={onClose}
        isOpen={isOpen}
        onOpen={onOpen}
        placement="left"
      >
        <SideBar />
      </Drawer>
    </Box>
  );
}

export default Header;
