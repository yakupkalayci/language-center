import { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Grid,
} from "@chakra-ui/react";
import WordContainer from "./_partials/WordContainer";
import DescContainer from "./_partials/DescContainer";

function GameModal(props) {
  // destruct props
  const { onClose, isOpen } = props;
  const [activeWordCard, setActiveWordCard] = useState();
  const [activeDescCard, setActiveDescCard] = useState();
  const [completedCards, setCompletedCards] = useState([]);

  const wordData = [
    {
      id: '1',
      text: 'school',
      desc: 'okul',
    },
    {
      id: '2',
      text: 'money',
      desc: 'para',
    },
    {
      id: '3',
      text: 'car',
      desc: 'araba',
    },
    {
      id: '4',
      text: 'bus',
      desc: 'otobüs',
    },
    {
      id: '5',
      text: 'taxi',
      desc: 'taksi',
    }
  ];

  const descData = [
    {
      id: '6',
      text: 'para'
    },
    {
      id: '7',
      text: 'taksi'
    },
    {
      id: '8',
      text: 'araba'
    },
    {
      id: '9',
      text: 'okul'
    },
    {
      id: '10',
      text: 'otobüs'
    }
  ]

  const handleWordCardClick = (id, desc) => {
    if(completedCards.includes(id)) return;
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
    if(completedCards.includes(id)) return;
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

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="2xl">
      <ModalOverlay />
      <ModalContent bgGradient="linear-gradient(0deg, #FFDEE9 0%, #B5FFFC 100%)">
        <ModalHeader>Kelime Eşleştir</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid
            templateColumns="repeat(24, 1fr)"
            columnGap={{base: '8px', sm: '16px'}}
          >
            <WordContainer
              activeWordCard={activeWordCard}
              completedCards={completedCards}
              handleWordCardClick={handleWordCardClick}
              data={wordData}
            />
            <DescContainer
              activeDescCard={activeDescCard}
              completedCards={completedCards}
              handleDescCardClick={handleDescCardClick}
              data={descData}
            />
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default GameModal;
