import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Spacer,
  ButtonGroup,
  Button,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import useAuthStore from "../../store/auth/authStore";
import useModalStore from "../../store/modal/modalStore";
import Drawer from "../../components/drawer/Drawer";
import SideBar from "./_partials/SideBar";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const { userData, clearUser, clearToken } = useAuthStore();
  const { open, setStatus, setActions, close } = useModalStore();

  const navigteToLoginPage = () => {
    navigate("/uyelik-islemleri", { state: { formType: "login" } });
  };

  const navigteToRegisterPage = () => {
    navigate("/uyelik-islemleri", { state: { formType: "register" } });
  };

  const navigteToProfilePage = () => {
    navigate("/profilim");
  };

  const logout = () => {
    setStatus("info");
    setActions([
      {
        label: "Evet",
        variant: "danger",
        onClick: () => {
          clearUser();
          clearToken();
          navigate("/");
          close();
        }
      },
      {
        label: "Hayır",
        onClick: () => close(),
      }
    ])
    open({ title: "Çıkış Yap", message: "Çıkış yapmak istediğine emin misin?" });
  }

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
        direction={!userData || !userData.email ? { base: "column", md: "row" } : "row"}
        justifyContent="space-between"
        padding={{ base: "16px", lg: "32px" }}
        gap={!userData || !userData.email ? { base: "12px", md: 0 } : "unset"}
      >
        {userData && userData.email && (
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
            <NavLink to={"/"}>Language Center</NavLink>
          </Heading>
        {userData && userData.email && (
          <Menu autoSelect={false}>
            <MenuButton
              as={Box}
              className="icon-profile"
              color="base.white"
              fontSize="24px"
              cursor="pointer"
              _hover={{ color: "primary.gray" }}
            />
            <MenuList >
              <MenuItem onClick={navigteToProfilePage}>Profilim</MenuItem>
              <MenuItem onClick={logout}>Çıkış Yap</MenuItem>
            </MenuList>
          </Menu>
        )}
        {!userData || !userData.email ? (
          <>
            <Spacer />
            <ButtonGroup gap="2">
              <Button variant="secondary" onClick={navigteToRegisterPage}>
                Üye Ol
              </Button>
              <Button variant="primary" onClick={navigteToLoginPage}>
                Giriş Yap
              </Button>
            </ButtonGroup>
          </>
        ) : null}
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
