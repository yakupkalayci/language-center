import { SimpleGrid, Box, Text, Image, Button } from "@chakra-ui/react";
import HowToStep from "./HowToStep";

function HowTo() {

    const steps = [
        {
            index: '01',
            desc: 'Öncelikle üye değilsen hemen bir hesap oluşturarak uygulamayı kullanmaya başlayabilirsin.'
        },
        {
            index: '02',
            desc: 'Hesabını oluşturduktan sonra, ilk kelimelerini ekleyerek kelime listelerini doldurabilirsin.'
        },
        {
            index: '03',
            desc: 'Kelime listen hazır olduğuna göre, şimdi bu kelimeleri öğrenmeye başlayabilirsin. Uygulama, kelimeleri öğrenmen için sana çeşitli alıştırmalar sunacak.'
        },
    ]

    return (

        <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={6}
            marginTop={{ base: '22px', md: '40px' }}
            paddingTop={{ base: '22px', md: '40px' }}
            id="howto"
        >
            <Box
                bg="gray.100"
                p={6}
                borderRadius="md"
                boxShadow={"md"}
                _hover={{ boxShadow: "lg" }}
            >
                <Text fontSize={{ base: '18px', md: "36px" }} fontWeight={600} marginBottom={"40px"}>Nasıl kullanılır?</Text>
                {
                    steps.map((step, index) => (
                        <HowToStep key={step.index} index={step.index} desc={step.desc} isFirstItem={index === 0} isLastItem={index === steps.length - 1} />
                    ))
                }
                <Button as={"a"} href="/panel" variant={"secondary"} borderRadius={"24px"} padding={"14px 22px"} fontWeight={"bold"} textColor={"base.white"} marginTop={"16px"} _hover={{ opacity: 0.9 }}>
                    Uygulamayı Aç
                </Button>
            </Box>
            <Box
                bg="gray.100"
                p={6}
                borderRadius="md"
                boxShadow={"md"}
                _hover={{ boxShadow: "lg" }}
            >
                <Image
                    src={"/online-language-learning.png"}
                />
            </Box>
        </SimpleGrid>
    );
}
export default HowTo