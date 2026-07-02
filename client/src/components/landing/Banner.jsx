import { Text, Box, Image, useBreakpointValue } from '@chakra-ui/react';

function Banner() {

    const appImageSrc = useBreakpointValue({
        base: "app-mobile.png",
        md: "app.png",
    });

    return (
        <>
            <Text fontSize={{ base: '48px', md: "100px" }} textAlign={"center"} fontWeight={600}>
                İngilizce ajandanız.
            </Text>

            <Box
                bg="linear-gradient(360deg, rgba(94,0,152,1) 0%, rgba(255,193,193,1) 120%)"
                borderRadius={{ base: '8', md: '24' }}
                height={{ base: '240px', md: '380px' }}
                mx={"auto"}
                mt={{ base: '300px', md: '190px' }}
                pos={"relative"}
            >
                <Image
                    src={appImageSrc}
                    borderRadius={{ base: '8', md: "24" }}
                    borderBottomLeftRadius={0}
                    borderBottomRightRadius={0}
                    h={{ base: 'auto', md: "500px" }}
                    maxH={{ base: 'calc(100% + 200px)', md: 'unset' }}
                    w={"80%"}
                    pos={"absolute"}
                    bottom={0} left={"50%"}
                    transform={"translateX(-50%)"}
                />
            </Box>
        </>
    )
}

export default Banner;