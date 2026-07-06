import { Box } from "@chakra-ui/react";

function WordCard({
  id,
  desc,
  text,
  handleCardClick,
  activeCard,
  completedCards,
  type,
}) {
  const isActive = activeCard?.id === id;
  const isCompleted = completedCards?.includes(id);
  return (
    <Box
      border="2px solid"
      borderColor={isActive ? "red" : isCompleted ? "green" : "black"}
      textAlign="center"
      padding={{ base: "8px", md: "12px 48px" }}
      cursor="pointer"
      borderRadius="8px"
      bgColor={isCompleted ? "green" : "transparet"}
      color={isCompleted ? "white" : "black"}
      transform={isActive ? "translateY(-5px)" : "unset"}
      transition="all 0.3s ease"
      fontWeight="800"
      onClick={() =>
        type === "word" ? handleCardClick(id, desc) : handleCardClick(id, text)
      }
    >
      {text}
    </Box>
  );
}
export default WordCard;
