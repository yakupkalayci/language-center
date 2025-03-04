import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FormItem from "../form-elements/FormItem";
import Input from "../form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";

function WordModal(props) {
  // destruct props
  const {
    onClose,
    isOpen,
    handleSaveWord,
    modalType,
    editData,
    handleEditWord,
    handleDelete,
  } = props;
  const defaultValues = {
    word: "",
    wordType: "",
    desc: "",
    examples: "",
    similarWords: "",
    extraNotes: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    if (modalType === "add") {
      handleSaveWord(data);
    } else if (modalType === "edit" && editData?.id) {
      handleEditWord(data, editData.id);
    } else if (modalType === "delete" && editData) {
      handleDelete(editData);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (modalType === "edit" && editData?.data) {
        const data = editData.data;
        reset({
          word: data[0] || "",
          wordType: data[1] || "",
          desc: data[2] || "",
          examples: data[3] || "",
          similarWords: data[4] || "",
          extraNotes: data[5] || "",
        });
      } else {
        reset(defaultValues);
      }
    }
  }, [isOpen, reset, editData]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {modalType === "add"
            ? "Kelime Ekle"
            : modalType === "delete"
            ? "Emin Misiniz?"
            : "Kelime Güncelle"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
            {modalType === "delete" ? (
              <Text marginBottom="16px">Seçtiğiniz kelime silinecek..</Text>
            ) : (
              <>
                <FormItem errors={errors} itemName="word">
                  <Input
                    name="word"
                    type="text"
                    register={register}
                    placeholder="Kelime"
                    validationSchema={FORM_RULES.TEXT}
                    errors={errors}
                  />
                </FormItem>
                <FormItem errors={errors} itemName="wordType">
                  <Input
                    name="wordType"
                    type="text"
                    register={register}
                    placeholder="Türü"
                    validationSchema={FORM_RULES.TEXT}
                    errors={errors}
                  />
                </FormItem>
                <FormItem errors={errors} itemName="desc">
                  <Input
                    name="desc"
                    type="text"
                    register={register}
                    placeholder="Açıklama"
                    validationSchema={FORM_RULES.TEXT}
                    errors={errors}
                  />
                </FormItem>
                <FormItem itemName="examples">
                  <Input
                    name="examples"
                    type="text"
                    register={register}
                    placeholder="Örnekler"
                  />
                </FormItem>
                <FormItem itemName="similarWords">
                  <Input
                    name="similarWords"
                    type="text"
                    register={register}
                    placeholder="Benzer Kelimeler"
                  />
                </FormItem>
                <FormItem itemName="extraNotes">
                  <Input
                    name="extraNotes"
                    type="text"
                    register={register}
                    placeholder="Ekstra Notlar"
                  />
                </FormItem>
              </>
            )}
            <Flex alignItems="center" justifyContent="flex-end" gap="12px">
              <Button onClick={onClose}>Vazgeç</Button>
              <Button variant="primary" type="submit">
                {modalType === "add"
                  ? "Kaydet"
                  : modalType === "delete"
                  ? "Sil"
                  : "Güncelle"}
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WordModal;
