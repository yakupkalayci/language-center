import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

function WordList() {
  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Kelime</Th>
            <Th>Açıklama</Th>
            <Th>Telaffuz</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Scholl</Td>
            <Td>Okul</Td>
            <Td>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default WordList;
