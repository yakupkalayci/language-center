import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";

function useWordListHandler(data) {
  const [tableData, setTableData] = useState(data);
  const [editData, setEditData] = useState(null);
  const [modalType, setModalType] = useState("add");
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleSaveWord = (newWordData) => {
    const data = Object.values(newWordData);
    const newData = {
      id: Date.now(),
      data,
    };
    setTableData((prev) => [...prev, newData]);
  };

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
  };
}

export default useWordListHandler;
