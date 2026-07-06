import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import PageHeader from "../../components/header/PageHeader";
import WordMatchingGameModal from "../../components/modal/game-modals/word-matching-game/WordMatchingGameModal";

function WordListWeek() {
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
  } = useWordListHandler("week");

  const showGameModal = tableData?.words?.length > 0;

  return (
    <Container>
      <PageHeader 
        title="Haftanın Kelimeleri" 
        openModal={openAddModal} 
        openGameModal={onOpenGameModal}
        showGameModal={showGameModal}
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
      {
        showGameModal && (
          <WordMatchingGameModal
            isOpen={isOpenGameModal}
            onClose={onCloseGameModal}
            words={tableData.words}
          />
        )
      }
    </Container>
  );
}

export default WordListWeek;
