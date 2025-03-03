import { Flex, Heading, Button, Box } from "@chakra-ui/react";

function PageHeader(props) {
  const { title, openModal } = props;

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading variant="pageTitle">{title}</Heading>
      <Button variant="secondary" onClick={openModal}>
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
  );
}

export default PageHeader;
