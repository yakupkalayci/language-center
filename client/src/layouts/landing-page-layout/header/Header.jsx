import { useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
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
import useAuthStore from "../../../store/auth/authStore";
import { logout as serverLogout } from "../../../services/auth";
import useModalStore from "../../../store/modal/modalStore";

function Header() {

  const navLinks = [
    {
      href: '#',
      label: 'Özellikler'
    },
    {
      href: '#',
      label: 'Nasıl Kullanılır?'
    },
    {
      href: '#',
      label: 'İletişim'
    },
  ]

  return (
    <Box
      as="header"
      margin={"0 40px"}
    >
      <Flex
        align="center"
        position="relative"
        direction={"row"}
        justifyContent="space-between"
        paddingTop={"16px"}
        paddingBottom={"72px"}
        gap={"12px"}
      >
        <Heading
          as="h1"
        >
          <NavLink to={"/"}>Language</NavLink>
        </Heading>
        <Flex
          gap={6}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {
            navLinks.map(link => (
              <NavLink to={link.href}>
                <Text>
                  {link.label}
                </Text>
              </NavLink>
            ))
          }
        </Flex>
        <Button variant={"secondary"} borderRadius={"24px"} padding={"14px 22px"} fontWeight={"bold"} textColor={"base.white"}>
          Uygulamayı Aç
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
