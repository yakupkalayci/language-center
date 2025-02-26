import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default WordList;
