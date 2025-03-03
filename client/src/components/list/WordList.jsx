import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Box,
} from "@chakra-ui/react";

function WordList(props) {
  // destruct props
  const { type, data } = props;

  return (
    <TableContainer bgColor="base.white" borderRadius="8px">
      <Table>
        <Thead>
          <Tr>
            {data.headings.map((item) => (
              <Th key={item}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data.body.map((item, index) => (
            <Tr key={index}>
              {item.data.map((text, index) => (
                <Td key={index}>{text}</Td>
              ))}
              {type === "page" && (
                <Td>
                  <Button marginRight="8px" bgColor="green.300">
                    <Box
                      as="i"
                      className="icon-edit"
                      color="base.white"
                      fontSize="14px"
                    />
                  </Button>
                  <Button bgColor="red">
                    <Box
                      as="i"
                      className="icon-delete"
                      color="base.white"
                      fontSize="14px"
                    />
                  </Button>
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
