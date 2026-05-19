import { useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Flex, Button, Box, Text, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import FormItem from '../../form-elements/formItem';
import Input from '../../form-elements/Input';
import { deleteMedia } from '../../../services/media';

function MediaModal({ type, isOpen, onClose, onSave, editingMedia, deletingMediaId, handleGetMediaList }) {
  const { register, handleSubmit, reset } = useForm({ defaultValues: { name: editingMedia?.title || '', image: editingMedia?.image || '' } });
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      onSave && await onSave({ name: data.name, image: data.image || null });
      onClose();
      await handleGetMediaList();
    } catch(err) {
      console.log("onSubmit fetch error:", err);
      toast({
        title: 'Hata',
        description: 'Medya kaydedilirken bir hata oluştu.',
        status: 'error'
      })
    }
  };

  const handleDeleteMedia = async () => {
    try {
      await deleteMedia(deletingMediaId);
      onClose();
      toast({
        title: 'Başarılı',
        description: 'Medya başarıyla silindi.',
        status: 'success'
      });
      handleGetMediaList();
    } catch(err) {
      console.log("deleteMedia FETCH error:", err);
      toast({
        title: 'Hata',
        description: 'Medya silinirken bir hata oluştu.',
        status: 'error'
      })      
    }
  }

  useEffect(() => { if (isOpen) reset(); }, [isOpen, reset]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {
            type === 'add' ? 'Film / Dizi / Video Ekle' : type === 'edit' ? 'Film / Dizi / Video Düzenle' : "Emin Misniz?"
          }
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            {
              type === 'delete' ? (
                <Text marginBottom="16px">Seçtiğiniz medya silinecek.</Text>
              ) : (
                <>
                  <FormItem itemName="name">
                    <Input name="name" register={register} placeholder="Ad" />
                  </FormItem>
                  <FormItem itemName="image">
                    <Input name="image" register={register} placeholder="Görsel URL (opsiyonel)" />
                  </FormItem>
                </>
              )
            }

            <Flex alignItems="center" justifyContent="flex-end" gap="12px">
              <Button onClick={onClose}>Vazgeç</Button>
              {
                type === 'delete' ? (
                  <Button variant="primary" type="button" onClick={handleDeleteMedia}>Sil</Button>
                ) : (
                  <Button variant="primary" type="submit">Kaydet</Button>
                )
              }
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default MediaModal;
