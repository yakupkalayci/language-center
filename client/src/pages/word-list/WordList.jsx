import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";
import GameModal from "../../components/modal/game-modal/GameModal";

function WordListPage() {
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
        isOpenGameModal,
        onCloseGameModal,
        isLoading,
        error,
        isActionLoading,
        pageIndex,
        totalPages,
        onPageChange,
        retry
    } = useWordListHandler();
    
    const showGameModal = tableData?.words?.length > 0;

    return (
        <Container>
            <PageHeader
                title="Tüm Kelimeler"
                openModal={openAddModal}
                openGameModal={onOpenGameModal}
                pageType="allWords"
                showGameModal={showGameModal}
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
    )
}

export default WordListPage;