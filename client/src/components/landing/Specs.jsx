import { Text, Box, Flex } from '@chakra-ui/react';
import SpecCard from './SpecCard';

function Specs() {

    const specs = [
        {
            title: 'Kelime Listeleri',
            desc: 'Günlük, Haftalık, Aylık olarak öğrendiğiniz kelimeleri takip edin. Bugün eklediğiniz kelimeler Bugünün kelimeleri listesine, hafta bitiminde haftanın kelimeleri listesine ve hafta sonunda ayın kelimeleri listesine aktarılır. Böylece seçtiğiniz zaman dilimine göre öğrendiğiniz kelimeleri tekrar edebilirsiniz. Tüm kelimeleri bir arada görmek isterseniz de Tüm Kelimeler listesini inceleyebilirsiniz.',
            icon: 'calendar-day',
        }, 
        {
            title: 'Öğrendiğim Kelimeler',
            desc: 'Uygulamaya her girişinizde açılan popupda o gün öğrenmeniz gereken kelimeler kelime listenizden rastgele seçilerek size gösterilir. Böylelikle kelime listenizin arkalarında kalan kelimeleri de düzenli olarak tekrar etmiş olursunuz. Ayrıca her gün kaç adet kelime tekrar etmek istediğinizi ayarlardan değiştirebilirsiniz.',
            icon: 'leaderboard',
        }, 
        {
            title: 'Film, Dizi ve Video Kelimeleri',
            desc: 'İzlediğiniz film, dizi veya videolardan öğrendiğiniz kelimeleri kaydedin. Böylece izlediğiniz içeriklerle ilgili kelimeleri ayrı bir listede takip ederek daha iyi öğrenebilir ve tekrar edebilirsiniz.',
            icon: 'video-library',
        }, 
        {
            title: 'Kelime Oyunları',
            desc: 'Kelime oyunları ile öğrendiğiniz kelimeleri eğlenceli bir şekilde tekrar edin. Farklı oyun modları ile kelime dağarcığınızı geliştirin.',
            icon: 'videogame',
        },
    ];

    return (
        <Box marginTop={{ base: '22px', md: '40px' }} paddingTop={{ base: '22px', md: '40px' }} id='specs'>
            <Text fontSize={{ base: '14px', md: "24px" }} marginBottom={"24px"}>Özellikler</Text>
            <Text fontSize={{ base: '18px', md: "36px" }} fontWeight={600}>Dil öğrenim sürecinde en büyük yardımcınız</Text>
            <Flex justifyContent={"flex-start"} alignItems={"flex-start"} gap={"48px"} overflow={"auto"} marginTop={{ base: '36px', md: '96px' }} padding={"12px 0"}>
                {specs.map((spec, index) => (
                    <SpecCard key={index} title={spec.title} desc={spec.desc} icon={spec.icon} />
                ))}
            </Flex>
        </Box>
    )
}

export default Specs