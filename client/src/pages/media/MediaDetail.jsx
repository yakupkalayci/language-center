import { useEffect, useState } from 'react';
import { Container, Box, Heading, Button, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import WordList from '../../components/list/WordList';
import WordModal from '../../components/modal/word-modal/WordModal';
import { fetchMedia, fetchMediaWords, createMediaWord, updateMediaWord, deleteMediaWord } from '../../services/media';
import { useNavigate } from 'react-router-dom';

function MediaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [media, setMedia] = useState(null);
  const [data, setData] = useState({ words: [] , pagination: { total: 0, page:1, pageSize:10, totalPages:0 }});
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [editData, setEditData] = useState(null);
  const [pageIndex, setPageIndex] = useState(1);

  const loadWords = async () => {
    const res = await fetchMediaWords(id, pageIndex, 10);
    setData(res);
  };

  const openAdd = () => { setModalType('add'); setEditData(null); setIsOpen(true); };
  const openEdit = (item) => { setModalType('edit'); setEditData(item); setIsOpen(true); };

  const handleSave = async (word) => { await createMediaWord(id, word); loadWords(); };

  const handleEdit = async (word, wordId) => { await updateMediaWord(id, wordId, word); loadWords(); };

  const handleDelete = async (wordId) => { await deleteMediaWord(id, wordId); loadWords(); };
 
  useEffect(() => {
    loadWords();
  }, [id, pageIndex]);

  useEffect(() => {
    (async () => {
      const m = await fetchMedia(id);
      setMedia(m);
    })();
  }, [id]);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Heading size="lg">{media ? media.title : 'Film / Dizi'}</Heading>
        <Flex gap={2}>
          <Button
            variant="secondary"
            onClick={openAdd}
            w={{ base: "100%", md: "fit-content" }}
          >
            <Box
              as="i"
              className="icon-plus"
              color="base.white"
              fontSize="14px"
              marginRight="8px"
            />
            Kelime Ekle
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate("/film-dizi-video-kelimeleri")}
            w={{ base: "100%", md: "fit-content" }}
          >
            Geri
          </Button>
        </Flex>
      </Box>

      <WordList 
        type="page" 
        headings={["Kelime", "Türü", "Açıklama", "Örnekler", "Benzer Kelimeler", "Ekstra Notlar", "Sesli Dinle", "Aksiyonlar"]} 
        data={data} 
        openModal={(item) => { setEditData(item); setModalType('edit'); setIsOpen(true); }} 
        openDeleteModal={(id) => { setEditData(id); setModalType('delete'); setIsOpen(true); }} 
        loading={false} 
        error={false} 
        pageIndex={pageIndex} 
        totalPages={data.pagination.totalPages} 
        onPageChange={(p) => setPageIndex(p)} 
      />

      <WordModal isOpen={isOpen} onClose={() => setIsOpen(false)} handleSaveWord={(d) => handleSave(d)} modalType={modalType} editData={editData} handleEditWord={(d, id) => handleEdit(d, id)} handleDelete={(id) => handleDelete(id)} isActionLoading={false} />
    </Container>
  );
}

export default MediaDetail;
