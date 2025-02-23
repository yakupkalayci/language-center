import {
  Drawer as CharakDrawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

function Drawer(props) {
  // destruct props
  const { onClose, isOpen, size, placement, children } = props;

  return (
    <CharakDrawer
      onClose={onClose}
      isOpen={isOpen}
      size={size}
      placement={placement}
    >
      <DrawerOverlay />
      <DrawerContent>{children}</DrawerContent>
    </CharakDrawer>
  );
}

export default Drawer;
