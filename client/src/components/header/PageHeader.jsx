import { Flex, Heading, Button, Box } from "@chakra-ui/react";

function PageHeader(props) {
  const { title, openModal, openGameModal } = props;

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ md: "16px" }}
    >
      <Heading variant="pageTitle" sx={{ textWrap: "nowrap" }}>
        {title}
      </Heading>
      <Flex
        alignItems="center"
        gap="12px"
        flexDirection={{ base: "column", md: "row" }}
        marginBottom="16px"
        width={{ base: "100%", md: "unset" }}
      >
        <Button
          variant="primary"
          onClick={() => openGameModal()}
          w={{ base: "100%", md: "fit-content" }}
        >
          <Box
            as="i"
            className="icon-plus"
            color="base.white"
            fontSize="14px"
            marginRight="8px"
          />
          Eşleştirme Oyunu
        </Button>
        <Button
          variant="secondary"
          onClick={openModal}
          w={{ base: "100%", md: "fit-content" }}
        >
          <Box
            as="i"
            className="icon-plus"
            color="base.white"
            fontSize="14px"
            marginRight="8px"
          />
          Kelime Ekle
        </Button>
      </Flex>
    </Flex>
  );
}

export default PageHeader;
