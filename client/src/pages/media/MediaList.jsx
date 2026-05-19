import { useState, useEffect } from 'react';
import { Container, Grid, GridItem, Box, Image, Text, Flex, useToast } from '@chakra-ui/react';
import MediaModal from '../../components/modal/media-modal/MediaModal';
import PageHeader from '../../components/header/PageHeader';
import { fetchMediaList, createMedia, updateMedia } from '../../services/media';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/common/Loader';

function MediaList() {
    const [isLoading, setIsLoading] = useState(false);
    const [list, setList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalType, setModalType] = useState();
    const [editingMedia, setEditingMedia] = useState();
    const [deletingMediaId, setDeletingMediaId] = useState();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSave = async (data) => {
        if (modalType === 'add') {
            const item = await createMedia({ title: data.name, image: data.image });
            setList(prev => [item, ...prev]);
            navigate(`/media/${item.id}`);
        } else if (modalType === 'edit') {
            const res = await updateMedia(editingMedia.id, { title: data.name, image: data.image });
        }
    };

    const handleOpeModal = (type, editingItem) => {
        setModalType(type);
        setOpenModal(true);
        if (type === 'edit') {
            setEditingMedia(editingItem);
        } else if (type === 'delete') {
            setDeletingMediaId(editingItem.id);
        }
    }

    const handleGetMediaList = async () => {
        try {
            setIsLoading(true);
            const items = await fetchMediaList();
            setList(items || []);
        } catch (err) {
            console.log(("fetchMediaList fetch error:", err));
            toast({
                title: "Hata",
                description: "Medya listesi alınırken bir hata oluştu.",
                status: "error"
            })
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetMediaList();
    }, []);

    return (
        <Container>
            <PageHeader
                title="Medya Kelimeleri"
                pageType="media"
                openAddMediaModal={() => handleOpeModal("add")}
            />

            {
                isLoading ? <Loader /> :
                    list.length === 0 ? (
                        <Box textAlign="center" p={8}>
                            <Text fontWeight="semibold">Henüz hiç medya eklenmemiş. Hemen bir tane ekleyin ve kelimelerinizi kaydedin.</Text>
                        </Box>
                    ) : (
                        <Grid templateColumns="repeat(12,1fr)" gap={4}>
                            {list.map(item => (
                                <GridItem 
                                    key={item.id} 
                                    colSpan={{ base: 12, md: 4 }} 
                                    _hover={{
                                    boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px",
                                }}>
                                    <Flex 
                                        flexDirection={"column"}
                                        justifyContent={"space-between"}
                                        borderRadius="8px" 
                                        boxShadow="md" 
                                        p={4} 
                                        cursor="pointer"
                                        height="100%"
                                        onClick={() => navigate(`/media/${item.id}`)}
                                    >
                                        {item.image ? <Image src={item.image} alt={item.name} boxSize="100%" maxW="100%" height="100%" objectFit="cover" mb={3} /> : null}
                                        <Flex justifyContent={"space-between"} alignItems={"center"}>
                                            <Text fontWeight="semibold">{item.title}</Text>
                                            <Flex alignItems={"center"} gap={1}>
                                                <Box
                                                    as="i"
                                                    className="icon-edit"
                                                    color="#47A025"
                                                    cursor="pointer"
                                                    fontWeight="600"
                                                    fontSize="20px"
                                                    marginRight="16px"
                                                    display="inline-block"
                                                    transition="all 0.1s ease"
                                                    _hover={{
                                                        transform: "scale(1.1)",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpeModal("edit", item);
                                                    }}
                                                />
                                                <Box
                                                    as="i"
                                                    className="icon-delete"
                                                    color="#6B0504"
                                                    fontSize="20px"
                                                    display="inline-block"
                                                    cursor="pointer"
                                                    fontWeight="600"
                                                    transition="all 0.1s ease"
                                                    _hover={{
                                                        transform: "scale(1.1)",
                                                    }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpeModal("delete", item)
                                                    }}
                                                />
                                            </Flex>
                                        </Flex>
                                    </Flex>
                                </GridItem>
                            ))}
                        </Grid>
                    )}

            {
                openModal && (
                    <MediaModal
                        type={modalType}
                        isOpen={openModal}
                        onClose={() => {
                            setOpenModal(false);
                            setEditingMedia(null);
                            setDeletingMediaId(null);
                        }}
                        onSave={handleSave}
                        editingMedia={editingMedia}
                        deletingMediaId={deletingMediaId}
                        handleGetMediaList={handleGetMediaList}
                    />
                )
            }
        </Container>
    );
}

export default MediaList;
