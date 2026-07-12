import { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

function Header() {

  const [isMobileNavActive, setIsMobileNavActive] = useState(false);

  const navLinks = [
    {
      href: '#specs',
      label: 'Özellikler'
    },
    {
      href: '#howto',
      label: 'Nasıl Kullanılır?'
    },
    {
      href: '#contact',
      label: 'İletişim'
    },
  ]

  return (
    <Box
      as="header"
      padding={{base: '0 20px', md: "0 40px"}}
      borderBottomRadius={{base: '20px', md: '0'}}
      boxShadow={{ base: "0px 2px 4px rgba(0,0,0,0.15)", md: "none" }}
      
    >
      <Flex
        align="center"
        position="relative"
        direction={"row"}
        justifyContent="space-between"
        paddingTop={{base: '20px', md: "16px"}}
        paddingBottom="22px"
        gap={"12px"}
      >
        <Heading
          as="h1"
        >
          <NavLink to={"/"}>
            <Image
              src={"/logo-colored.png"}
              height={{base: '60px', md: "120px"}}
            />
          </NavLink>
        </Heading>

        {/* Desktop Nav */}
        <Flex
          gap={6}
          justifyContent={"center"}
          alignItems={"center"}
          position={"fixed"}
          left={"50%"}
          transform={"translateX(-50%)"}
          backgroundColor={"rgba(255, 255, 255, 0.7)"}
          backdropFilter={"blur(12px)"}
          padding={"24px"}
          borderRadius={"20px"}
          display={{base: 'none', md: 'flex'}}
          zIndex={1000}
        >
          {
            navLinks.map(link => (
              <HashLink key={link.href} smooth to={link.href}>
                <Text _hover={{
                  color: "primary.pink",
                  fontWeight: 'bold'
                }}>
                  {link.label}
                </Text>
              </HashLink>
            ))
          }
        </Flex>

        <Box
          as="i"
          className="icon-menu-toggle"
          color="base.black"
          fontSize="20px"
          cursor="pointer"
          _hover={{
            color: "primary.gray",
          }}
          display={{base: 'block', md: 'none'}}
          onClick={() => setIsMobileNavActive(prev => !prev)}
        />
        <Button as="a" href="/panel" display={{base: 'none', md: 'flex'}} variant={"secondary"} borderRadius={"24px"} padding={"14px 22px"} fontWeight={"bold"} textColor={"base.white"} _hover={{opacity: 0.9}}>
          Uygulamayı Aç
        </Button>
      </Flex>

      {/* Mobile Nav */}
      <Flex
        flexDir={"column"}
        overflow="hidden"
        gap={4}
        paddingBottom={isMobileNavActive ? 6 : 0}
        maxH={isMobileNavActive ? "300px" : "0"}
        opacity={isMobileNavActive ? 1 : 0}
        transition="max-height 0.35s ease, opacity 0.25s ease"
      >
        {
          navLinks.map(link => (
            <HashLink key={link.href} smooth to={link.href}>
              <Text borderBottom={"0.5px solid"} borderColor={"primary.pink"} paddingBottom={2}>
                {link.label}
              </Text>
            </HashLink>
          ))
        }
        <Button as="a" href="/panel" width={"fit-content"} variant={"secondary"} borderRadius={"24px"} padding={"14px 22px"} fontWeight={"bold"} textColor={"base.white"}>
          Uygulamayı Aç
        </Button>
      </Flex>
    </Box>
  );
}

export default Header;
