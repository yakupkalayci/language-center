import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { getWords, addWord } from "../services/word";

function useWordListHandler() {
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [modalType, setModalType] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenGameModal,
    onOpen: onOpenGameModal,
    onClose: onCloseGameModal,
  } = useDisclosure();

  const openAddModal = () => {
    setModalType("add");
    onOpen();
  };

  const openEditModal = (item) => {
    setModalType("edit");
    setEditData(item);
    onOpen();
  };

  const openDeleteModal = (id) => {
    setModalType("delete");
    setEditData(id);
    onOpen();
  };

  const handleGetWords = async () => {
    try {
      setIsLoading(true);
      const res = await getWords();
      const words = await res.data.data;
      setTableData(words);
    } catch(err) {
      console.log("handleGetWords fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditWord = (updatedWord, id) => {
    const newDataArr = Object.values(updatedWord);
    const updatedData = {
      id,
      data: newDataArr,
    };
    const newTableData = tableData.map((item) =>
      item.id !== id ? { ...item } : updatedData
    );
    setTableData(newTableData);
  };

  const handleDelete = (id) => {
    const newData = tableData.filter((item) => item.id !== id);
    setTableData(newData);
  };

  const handleSaveWord = async (newWordData) => {
    // const data = Object.values(newWordData);
    // const newData = {
    //   id: Date.now(),
    //   data,
    // };
    // setTableData((prev) => [...prev, newData]);

    try {
      const res = await addWord(newWordData);
      console.log("TST", res);
      
    } catch(err) {
      console.log("handleSaveWord fetch error:", err);
    }
  };

  useEffect(() => {
    handleGetWords();
  }, []);

  return {
    tableData,
    openAddModal,
    openEditModal,
    openDeleteModal,
    handleEditWord,
    handleDelete,
    handleSaveWord,
    editData,
    modalType,
    isOpen,
    onClose,
    isOpenGameModal,
    onOpenGameModal,
    onCloseGameModal,
  };
}

export default useWordListHandler;
