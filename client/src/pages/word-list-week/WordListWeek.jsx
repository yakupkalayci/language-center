import { Container, Heading } from "@chakra-ui/react";
import WordList from "../../components/list/WordList";

function WordListWeek() {
  const data = {
    headings: [
      "Kelime",
      "Türü",
      "Açıklama",
      "Örnekler",
      "Telaffuz",
      "Benzer Kelimeler",
      "Ekstra Notlar",
    ],
    body: [
      {
        data: [
          "scholl",
          "n",
          "okul",
          "he goes to hight scholl.",
          "",
          "college",
          "",
        ],
      },
      {
        data: [
          "money",
          "n",
          "para",
          "Happiness is not all about money.",
          "",
          "treasure",
          "",
        ],
      },
    ],
  };
  return (
    <Container>
      <Heading variant="pageTitle">Haftanın Kelimeleri</Heading>
      <WordList type="page" data={data} />
    </Container>
  );
}

export default WordListWeek;
