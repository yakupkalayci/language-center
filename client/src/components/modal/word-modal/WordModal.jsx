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
import FormItem from "../../form-elements/FormItem";
import Input from "../../form-elements/Input";
import { FORM_RULES } from "../../../common/constants/form/formRules";
import Loader from "../../common/Loader";

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
    isActionLoading,
  } = props;
  const defaultValues = {
    word: "",
    type: "",
    description: "",
    examples: "",
    synonyms: "",
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

  const onSubmit = async (data) => {
    if (modalType === "add") {
      handleSaveWord(data);
    } else if (modalType === "edit" && editData?.id) {
      await handleEditWord(data, editData.id);
    } else if (modalType === "delete" && editData) {
      handleDelete(editData);
    }
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      if (modalType === "edit" && editData) {
        const data = editData;
        reset({
          word: data["word"] || "",
          type: data["type"] || "",
          description: data["description"] || "",
          examples: data["examples"] || "",
          synonyms: data["synonyms"] || "",
          extraNotes: data["extraNotes"] || "",
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
                <FormItem errors={errors} itemName="type">
                  <Input
                    name="type"
                    type="text"
                    register={register}
                    placeholder="Türü"
                    validationSchema={FORM_RULES.TEXT}
                    errors={errors}
                  />
                </FormItem>
                <FormItem errors={errors} itemName="description">
                  <Input
                    name="description"
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
                <FormItem itemName="synonyms">
                  <Input
                    name="synonyms"
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
              <Button variant="primary" type="submit" disabled={isActionLoading} minW={"100px"}>
                {
                  isActionLoading ? (
                    <Loader />
                  ) : modalType === "add"
                    ? "Kaydet"
                    : modalType === "delete"
                      ? "Sil"
                      : "Güncelle"
                }
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WordModal;
