import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import PageHeader from "../../components/header/PageHeader";
import GameModal from "../../components/modal/game-modal/GameModal";

function WordListMonth() {
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
    onOpenGameModal,
    isLoading,
    error,
    isActionLoading,
    pageIndex,
    totalPages,
    onPageChange,
    retry,
    isOpenGameModal,
    onCloseGameModal,
  } = useWordListHandler("month");

  const showGameModal = tableData?.words?.length > 0;

  console.log("TEST", showGameModal);
  

  return (
    <Container>
      <PageHeader 
        title="Ayın Kelimeleri" 
        openModal={openAddModal}
        showGameModal={showGameModal}
        openGameModal={onOpenGameModal}
      />
      <WordList
        type="page"
        headings={headings}
        data={tableData}
        openModal={openEditModal}
        openDeleteModal={openDeleteModal}
        loading={isLoading}
        error={error}
        pageIndex={pageIndex}
        totalPages={totalPages}
        onPageChange={onPageChange}
        retry={retry}
      />
      <WordModal
        onClose={onClose}
        isOpen={isOpen}
        handleSaveWord={handleSaveWord}
        handleEditWord={handleEditWord}
        handleDelete={handleDelete}
        modalType={modalType}
        editData={editData}
        isActionLoading={isActionLoading}
      />
      {
        showGameModal && (
          <GameModal
            isOpen={isOpenGameModal}
            onClose={onCloseGameModal}
            words={tableData.words}
          />
        )
      }
    </Container>
  );
}

export default WordListMonth;
