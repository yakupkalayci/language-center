import { useState, useEffect } from "react";
import { useDisclosure, useToast } from "@chakra-ui/react";
import { getWordByDateType, addWord, updateWord, deleteWord, getLearnedWords, markWordAsUnlearned } from "../services/word";

function useWordListHandler(dateType, isLearnedWordsPage) {
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
  const toast = useToast();
  const [tableData, setTableData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [modalType, setModalType] = useState("add");
  const [isLoading, setIsLoading] = useState(false);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dailyLearnedWordsData, setDailyLearnedWordsData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(new Date().setDate(new Date().getDate() - 7)),
    to: new Date()
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenGameModal,
    onOpen: onOpenGameModal,
    onClose: onCloseGameModal,
  } = useDisclosure();

  // pagination states
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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

  const openUnlearnModal = (id) => {
    setModalType("unlearn");
    setEditData(id);
    onOpen();
  };

  const handleGetWords = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const res = await getWordByDateType(dateType, pageIndex, pageSize);
      const words = await res.data.data;
      const pagination = res.data.data.pagination;
      setTableData(words);
      setTotalPages(pagination.totalPages);
    } catch(err) {
      console.log("handleGetWords fetch error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGetLearnedWords = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const res = await getLearnedWords(pageIndex, pageSize, selectedDate.from.toISOString(), selectedDate.to.toISOString());
      const data = res.data.data;
      const pagination = res.data.data.pagination;
      setTableData({
        words: data.words.map(word => word.word),
        pagination
      });
      setDailyLearnedWordsData(data.dailyCounts)
      setTotalPages(pagination.totalPages);
    } catch (err) {
      console.log("handleGetLearnedWords fetch error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUnlearnWord = async () => {
    try {
      setIsLoading(true);
      setError(false);
      const res = await markWordAsUnlearned(editData.id);
      if(res.data.status === 'success') {
        onClose();
        handleGetLearnedWords();
      }
    } catch (err) {
      console.log("handleUnlearnWord fetch error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleEditWord = async (updatedWord, id) => {
    try {
      setIsActionLoading(true);
      const res = await updateWord(updatedWord, id);
      if(res.data.status === 'success') {
        onClose();
        handleGetWords();
      }
    } catch(err) {
      console.log("handleGetWords fetch error:", err);
      toast({
        title: 'Hata',
        description: 'Bilinmeyen bir hata oluştu.',
        status: 'error'
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsActionLoading(true);
      const res = await deleteWord(id);
      if(res.data.status === 'success') {
        close();
        handleGetWords();
      }
    } catch(err) {
      console.log("handleGetWords fetch error:", err);
      toast({
        title: 'Hata',
        description: 'Bilinmeyen bir hata oluştu.',
        status: 'error'
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleSaveWord = async (newWordData) => {
    try {
      setIsActionLoading(true);
      const res = await addWord(newWordData);
      if (res.data.status === 'success') {
        onClose();
        handleGetWords();
      }
      return res;
    } catch(err) {
      console.log("handleSaveWord fetch error:", err);
      toast({
        title: 'Hata',
        description: 'Bilinmeyen bir hata oluştu.',
        status: 'error'
      });
    } finally {
      setIsActionLoading(false);
    }
  };

  const onPageChange = (page) => {
    setPageIndex(page);
  }

  const retry = () => {
    handleGetWords();
  }

  useEffect(() => {
    if(isLearnedWordsPage) {
      handleGetLearnedWords();
    } else {
      handleGetWords();
    }
  }, [pageIndex, pageSize]);

  useEffect(() => {
    if(isLearnedWordsPage) {
      handleGetLearnedWords();
    }
  }, [selectedDate.from, selectedDate.to]);

  return {
    headings,
    tableData,
    openAddModal,
    openEditModal,
    openDeleteModal,
    openUnlearnModal,
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
    isLoading,
    error,
    isActionLoading,
    pageIndex,
    totalPages,
    onPageChange,
    retry,
    dailyLearnedWordsData,
    selectedDate,
    setSelectedDate,
    handleUnlearnWord
  };
}

export default useWordListHandler;
