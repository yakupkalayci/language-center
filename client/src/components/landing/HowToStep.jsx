import { Flex, Text } from "@chakra-ui/react"

function HowToStep({index, desc, isFirstItem, isLastItem}) {
  return (
    <Flex 
        justify={"space-between"} 
        alignItems={"center"} 
        borderColor={"gray.200"} 
        borderBottom={!isLastItem ? '1px solid' : ''} 
        borderTop={isFirstItem ? "1px solid" : "none"}
        gap={"24px"}
        padding={"20px"}
        paddingLeft={0}
    >
        <Text fontWeight={700}>{index}</Text>
        <Text>{desc}</Text>
    </Flex>
  )
}

export default HowToStep;