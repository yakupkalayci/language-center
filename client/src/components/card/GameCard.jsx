import { Box, Flex, Text, Image } from "@chakra-ui/react"

function GameCard({ gameInfo }) {

    const { name, image, onClick } = gameInfo;

    return (
        <Box
            padding="24px"
            bgColor="base.white"
            borderRadius="8px"
            boxShadow="rgba(149, 157, 165, 0.2) 0px 8px 24px"
            _hover={{
                boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
            }}
            transition="all 0.3s ease"
            height={"100%"}
            cursor={"pointer"}
            onClick={onClick}
        >
            <Flex
                flexDir="column"
                justifyContent={"center"}
                alignItems={"center"}
                gap={4}
            >
                <Image 
                    src={image}
                    height={"120px"}
                />
                <Text fontWeight={"bold"}>{name}</Text>
            </Flex>
        </Box>
    )
}

export default GameCard