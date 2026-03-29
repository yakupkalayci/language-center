import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import GameModal from "../../components/modal/game-modal/GameModal";

function WordListDay() {

  const {
    headings,
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
  } = useWordListHandler("day");  

  return (
    <Container>
      <PageHeader
        title="Günün Kelimeleri"
        openModal={openAddModal}
        openGameModal={onOpenGameModal}
        pageType="day"
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
