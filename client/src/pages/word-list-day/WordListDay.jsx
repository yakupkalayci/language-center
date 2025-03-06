import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/WordModal";
import GameModal from "../../components/modal/game-modal/GameModal";

function WordListDay() {
  const headings = [
    "Kelime",
    "Türü",
    "Açıklama",
    "Örnekler",
    "Benzer Kelimeler",
    "Ekstra Notlar",
    "Sesli Dinle",
    "Aksiyonlar",
  ];
  const data = [
    {
      id: "0",
      data: ["scholl", "n", "okul", "he goes to hight scholl.", "", "college"],
    },
    {
      id: "1",
      data: [
        "money",
        "n",
        "para",
        "Happiness is not all about money.",
        "",
        "treasure",
      ],
    },
  ];

  const {
    tableData,
    openAddModal,
    openEditModal,
    openDeleteModal,
    handleSaveWord,
    handleEditWord,
    handleDelete,
    modalType,
    editData,
    onClose,
    isOpen,
    isOpenGameModal,
    onOpenGameModal,
    onCloseGameModal,
  } = useWordListHandler(data);  

  return (
    <Container>
      <PageHeader
        title="Günün Kelimeleri"
        openModal={openAddModal}
        openGameModal={onOpenGameModal}
      />
      <WordList
        type="page"
        headings={headings}
        data={tableData}
        openModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
      <WordModal
        onClose={onClose}
        isOpen={isOpen}
        handleSaveWord={handleSaveWord}
        handleEditWord={handleEditWord}
        handleDelete={handleDelete}
        modalType={modalType}
        editData={editData}
      />
      <GameModal isOpen={isOpenGameModal} onClose={onCloseGameModal} />
    </Container>
  );
}

export default WordListDay;
