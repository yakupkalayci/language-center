import { GridItem, Text, Flex } from "@chakra-ui/react";
import WordCard from "./WordCard";

function DescContainer(props) {
  // destruct props
  const { data, activeDescCard, completedCards, handleDescCardClick } = props;

  return (
    <GridItem colSpan="12">
      <Text
        textAlign="center"
        paddingBottom="8px"
        borderBottom="2px solid black"
        fontSize="18px"
        fontWeight="700"
      >
        Açıklamalar
      </Text>
      <Flex flexDirection="column" gap="16px" paddingTop="12px">
        {data.map((item) => (
          <WordCard
            key={item.id}
            id={item.id}
            text={item.text}
            activeCard={activeDescCard}
            completedCards={completedCards}
            handleCardClick={handleDescCardClick}
            type="desc"
          />
        ))}
      </Flex>
    </GridItem>
  );
}

export default DescContainer;
