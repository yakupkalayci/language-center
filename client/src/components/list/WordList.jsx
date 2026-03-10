import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text
} from "@chakra-ui/react";
import Loader from "../common/Loader";

function WordList(props) {
  // destruct props
  const { type, headings, data, openModal, openDeleteModal, loading, error } = props;



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
        <Tbody position={"relative"}>
          {
            loading || error ? (
              <Box h="200px" w="100%" textAlign={"center"}>
                {
                    <Box position={"absolute"} left={"50%"} top={"50%"} transform={"translate(-50%, -50%)"}>
                      {
                        loading ? <Loader /> : <Text color="alert.danger" fontWeight={"semibold"}>Bir Hata Oluştu.</Text>
                      }
                    </Box>
                }
              </Box>
            ) : (
              data?.words?.map((item, index) => (
                <Tr key={index}>
                  <Td>
                    {item.word}
                  </Td>
                  {
                    type === 'page' && (
                      <Td>
                        {item.type}
                      </Td>
                    )
                  }
                  <Td>
                    {item.description}
                  </Td>
                  {
                    type === 'page' && (
                      <>
                        <Td>
                          {item.examples}
                        </Td>
                        <Td>
                          {item.synonyms}
                        </Td>
                        <Td>
                          {item.extraNotes}
                        </Td>
                      </>
                    )
                  }
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
              ))
            )
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default WordList;
