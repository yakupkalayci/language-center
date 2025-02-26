import {
  DrawerCloseButton,
  DrawerBody,
  Text,
  Flex,
} from "@chakra-ui/react";
import { NavLink } from "react-router";
import SiderBarItem from "./SiderBarItem";

function SideBar() {

  const sidebarItems = [
    {
      id: 0,
      label: "Anasayfa",
      href: "/",
      icon: "home",
    },
    {
      id: 1,
      label: "Kelime Listesi",
      href: "/kelime-listesi",
      icon: "menu-book",
    },
    {
      id: 2,
      label: "Günün Kelimeleri",
      href: "/gunun-kelimeleri",
      icon: "library-books",
    },
    {
      id: 3,
      label: "Kelime Oyunları",
      href: "/kelime-oyunlari",
      icon: "videogame",
    },
    {
      id: 4,
      label: "Film, Dizi, Video Kelimeleri",
      href: "/film-dizi-video-kelimeleri",
      icon: "video-library",
    },
    {
      id: 5,
      label: "Ayarlar",
      href: "/ayarlar",
      icon: "settings",
    },
    {
      id: 6,
      label: "Profilim",
      href: "/profilim",
      icon: "profile",
    },
  ];

  return (
    <>
      <DrawerCloseButton />
      <DrawerBody padding="24px">
        <Text fontSize="20px" fontWeight="600">
          Sayfalar
        </Text>
        <Flex direction="column" marginTop="24px" gap="12px">
          {sidebarItems.map((item) => (
            <NavLink key={item.id} to={item.href}>
              {({ isActive }) => (
                <SiderBarItem
                  iconName={item.icon}
                  label={item.label}
                  isActive={isActive}
                />
              )}
            </NavLink>
          ))}
        </Flex>
      </DrawerBody>
    </>
  );
}

export default SideBar;
