import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import PageHeader from "../../components/header/PageHeader";

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
    retry
  } = useWordListHandler("month");
  return (
    <Container>
      <PageHeader title="Ayın Kelimeleri" openModal={openAddModal} />
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
    </Container>
  );
}

export default WordListMonth;
