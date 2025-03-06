import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
} from "@chakra-ui/react";

function WordList(props) {
  // destruct props
  const { type, headings, data, openModal, openDeleteModal } = props;

  return (
    <TableContainer
      bgColor="base.white"
      borderRadius="8px"
      boxShadow={type === 'page' ? "rgba(149, 157, 165, 0.2) 0px 8px 24px" : 'none'}
    >
      <Table>
        <Thead>
          <Tr>
            {headings?.map((item, index) => (
              <Th
                key={item}
                textAlign={
                  type !== "page" && index === headings.length - 1
                    ? "center"
                    : "start"
                }
              >
                {item}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <Tr key={index}>
              {item.data.map((text, index) => (
                <Td key={index}>{text}</Td>
              ))}
              <Td textAlign="center">
                <Box
                  as="i"
                  className="icon-volume-up"
                  cursor="pointer"
                  fontWeight="600"
                  fontSize="20px"
                  color="#3898FF"
                  display="inline-block"
                  transition="all 0.1s ease"
                  _hover={{
                    transform: "scale(1.1)",
                  }}
                />
              </Td>
              {type === "page" && (
                <Td textAlign="center">
                  <Box
                    as="i"
                    className="icon-edit"
                    color="#47A025"
                    cursor="pointer"
                    fontWeight="600"
                    fontSize="20px"
                    marginRight="16px"
                    display="inline-block"
                    transition="all 0.1s ease"
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                    onClick={() => openModal(item)}
                  />
                  <Box
                    as="i"
                    className="icon-delete"
                    color="#6B0504"
                    fontSize="20px"
                    display="inline-block"
                    cursor="pointer"
                    fontWeight="600"
                    transition="all 0.1s ease"
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                    onClick={() => openDeleteModal(item.id)}
                  />
                </Td>
              )}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default WordList;
