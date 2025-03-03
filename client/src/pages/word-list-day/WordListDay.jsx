import { useState } from "react";
import { Container, useDisclosure } from "@chakra-ui/react";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/WordModal";
import PageHeader from "../../components/header/PageHeader";

function WordListDay() {
  const data = {
    headings: [
      "Kelime",
      "Türü",
      "Açıklama",
      "Örnekler",
      "Benzer Kelimeler",
      "Ekstra Notlar",
      "Sesli Dinle",
      "Aksiyonlar"
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
  const [tableData, setTableData] = useState(data);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSaveWord = (newWordData) => {
    const headings = tableData.headings;
    const body = tableData.body;
    const newWord = Object.values(newWordData);
    const newData = {
      data: newWord,
    };
    body.push(newData);
    setTableData({ headings, body });
  };

  return (
    <Container>
      <PageHeader title="Günün Kelimeleri" openModal={onOpen} />
      <WordList type="page" data={tableData} />
      <WordModal
        onClose={onClose}
        isOpen={isOpen}
        handleSaveWord={handleSaveWord}
      />
    </Container>
  );
}

export default WordListDay;
