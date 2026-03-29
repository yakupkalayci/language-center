import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import PageHeader from "../../components/header/PageHeader";

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
  } = useWordListHandler("week");

  return (
    <Container>
      <PageHeader title="Haftanın Kelimeleri" openModal={openAddModal} />
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
    </Container>
  );
}

export default WordListWeek;
