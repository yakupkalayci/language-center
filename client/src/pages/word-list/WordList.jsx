
import { Container } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import WordModal from "../../components/modal/word-modal/WordModal";

function WordListPage() {
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
        onOpenGameModal,
    } = useWordListHandler();

    console.log("ENS", tableData);
    

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
        </Container>
    )
}

export default WordListPage;