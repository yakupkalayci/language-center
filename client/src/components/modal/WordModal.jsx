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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import FormItem from "../form-elements/FormItem";
import Input from "../form-elements/Input";
import { FORM_RULES } from "../../common/constants/form/formRules";

function WordModal(props) {
  // destruct props
  const { onClose, isOpen, handleSaveWord } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("formData", data);
    handleSaveWord(data);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Kelime Ekle</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box as="form" onSubmit={handleSubmit(onSubmit)}>
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
            <Flex alignItems="center" justifyContent="flex-end" gap="12px">
              <Button onClick={onClose}>Vazgeç</Button>
              <Button variant="primary" type="submit">
                Kaydet
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WordModal;
