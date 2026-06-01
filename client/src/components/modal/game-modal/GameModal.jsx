import { useEffect, useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
  Button,
  useToast
} from "@chakra-ui/react";
import Input from "../../form-elements/Input";
import Label from "../../form-elements/Label";
import WordContainer from "./_partials/WordContainer";
import DescContainer from "./_partials/DescContainer";
import { getRandomItemsFromArr } from "../../../utils/getRandomItemsFromArr";

function GameModal(props) {
  // destruct props
  const { onClose, isOpen, words } = props;

  // variables
  const toast = useToast();

  // states
  const [activeWordCard, setActiveWordCard] = useState();
  const [activeDescCard, setActiveDescCard] = useState();
  const [completedCards, setCompletedCards] = useState([]);
  const [step, setStep] = useState(0);
  const [wordCount, setWordCount] = useState();
  const [wordsData, setWordsData] = useState();
  const [descsData, setDescsData] = useState();

  const handleStartGame = () => {
    if (wordCount > 10) {
      toast({
        title: "Hata",
        description: "En fazla 10 kelime seçebilirsiniz.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setStep(1);
    let activeWords;
    if (wordCount > words.length) {
      activeWords = getRandomItemsFromArr(words, words.length);
    } else {
      activeWords = getRandomItemsFromArr(words, wordCount);
    }
    setWordsData(activeWords.map(word => {
      return {
        id: word.id,
        text: word.word,
        desc: word.description,
      };
    }));
    setDescsData(activeWords.sort(() => Math.random() - 0.5).map(word => {
      return {
        id: word.id,
        text: word.description,
      };
    }));
  }

  const handleRestartGame = () => {
    setStep(0);
  }

  const handleWordCardClick = (id, desc) => {
    if (completedCards.includes(id)) return;
    if (id === activeWordCard) {
      setActiveWordCard(null);
      return;
    }
    setActiveWordCard({
      id,
      desc,
    });
  };

  const handleDescCardClick = (id, word) => {
    if (completedCards.includes(id)) return;
    if (!activeWordCard) return;
    if (id === activeDescCard) {
      setActiveDescCard(null);
      return;
    }
    setActiveDescCard({
      id,
      word,
    });
  };

  const handleClose = () => {
    setStep(0);
    setWordCount();
    setWordsData();
    setDescsData();
    onClose();
  }

  useEffect(() => {
    setActiveDescCard(null);
  }, [activeWordCard]);

  useEffect(() => {
    if (!activeWordCard?.id || !activeDescCard?.id) return;
    if (
      activeWordCard.desc.toLowerCase() === activeDescCard.word.toLowerCase()
    ) {
      setCompletedCards([
        ...completedCards,
        activeWordCard.id,
        activeDescCard.id,
      ]);
      setActiveWordCard(null);
      setActiveDescCard(null);
    }
  }, [activeDescCard]);

  useEffect(() => {
    const completedCount = completedCards.length;
    const totalCount = wordsData?.length * 2;
    const isGameOver = completedCount === totalCount;
    if (isGameOver) {
      setStep(2);
    }

  }, [completedCards]);

  return (
    <Modal onClose={handleClose} isOpen={isOpen} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent
        bgGradient="linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)"
        maxHeight={"80vh"}
        overflow={"auto"}
      >
        <ModalHeader>Kelime Eşleştir</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            step === 0 ? (
              <>
                <Label label="Kaç kelime ile eşleştirmek istersiniz?" />
                <Input
                  name="wordCount"
                  type="number"
                  value={wordCount}
                  onChange={(e) => setWordCount(e.target.value)}
                  customStyles={{ border: '1px solid black' }}
                />
                <Button
                  variant="primary"
                  onClick={handleStartGame}
                  marginTop={3}
                  marginLeft={"auto"}
                  display={"flex"}
                >
                  Devam Et
                </Button>
              </>
            ) : (
              <Box>
                <Grid
                  templateColumns="repeat(24, 1fr)"
                  columnGap={{ base: '8px', sm: '16px' }}
                >
                  <WordContainer
                    activeWordCard={activeWordCard}
                    completedCards={completedCards}
                    handleWordCardClick={handleWordCardClick}
                    data={wordsData}
                  />
                  <DescContainer
                    activeDescCard={activeDescCard}
                    completedCards={completedCards}
                    handleDescCardClick={handleDescCardClick}
                    data={descsData}
                  />
                </Grid>
                  {
                    step === 2 && (
                      <Button
                        variant="primary"
                        onClick={handleRestartGame}
                        marginTop={3}
                        marginLeft={"auto"}
                        display={"flex"}
                      >
                        Yeniden Başlat
                      </Button>
                    )
                  }
              </Box>
            )
          }
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GameModal;
