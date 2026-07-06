import { GridItem, Text, Flex } from "@chakra-ui/react";
import WordCard from "./WordCard";

function WordContainer(props) {
  // destruct props
  const { data, activeWordCard, completedCards, handleWordCardClick } = props;

  return (
    <GridItem colSpan="12">
      <Text
        textAlign="center"
        paddingBottom="8px"
        borderBottom="2px solid black"
        fontSize="18px"
        fontWeight="700"
      >
        Kelimeler
      </Text>
      <Flex flexDirection="column" gap="16px" paddingTop="12px">
        {data.map((item) => (
          <WordCard
            key={item.id}
            id={item.id}
            text={item.text}
            desc={item.desc}
            activeCard={activeWordCard}
            completedCards={completedCards}
            handleCardClick={handleWordCardClick}
            type="word"
          />
        ))}
      </Flex>
    </GridItem>
  );
}

export default WordContainer;
