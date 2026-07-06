import { Container, Grid, GridItem, useToast } from '@chakra-ui/react';
import GameCard from '../../components/card/GameCard';
import WordMatchingGameModal from '../../components/modal/game-modals/word-matching-game/WordMatchingGameModal';
import useWordListHandler from '../../hooks/useWordListHandlers';

function WordGamesPage() {

    const toast = useToast();

    const {
        tableData,
        onOpenGameModal,
        isOpenGameModal,
        onCloseGameModal,
    } = useWordListHandler();

    const handleOpenWordMatchingGameModal = () => {
        const showGameModal = tableData?.words?.length > 0;
        if(showGameModal) {
            onOpenGameModal();
        } else {
            toast({
                title: "Uyarı",
                description: "Eşleştirme oyunu oynayabilmek için kelime listenize en az 2 kelime eklemelisiniz.",
                status: "info",
                duration: 5000,
                isClosable: true,
            });
        }
    }

    const games = [
        {
            id: 1,
            name: 'Eşleştirme Oyunu',
            image: '/word-matching-game.png',
            onClick: () => handleOpenWordMatchingGameModal(),
        }
    ];

    return (
        <Container>
            <Grid
                templateColumns="repeat(24, 1fr)"
                columnGap={{ base: "0", md: "16px" }}
                rowGap="16px"
            >
                {games.map((game) => (
                    <GridItem
                        key={game.id}
                        colSpan={{ base: "12", md: "8" }}
                    >
                        <GameCard gameInfo={game} />
                    </GridItem>
                ))}
            </Grid>

            {/* Kelime Eşleştirme Oyunu */}
            <WordMatchingGameModal
                isOpen={isOpenGameModal}
                onClose={onCloseGameModal}
                words={tableData.words}
            />
        </Container>
    )
}

export default WordGamesPage;