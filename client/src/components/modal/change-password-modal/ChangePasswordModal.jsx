import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useToast,
    Flex
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Input from "../../form-elements/Input";
import FormItem from "../../form-elements/formItem";
import Label from "../../form-elements/Label";
import { FORM_RULES } from "../../../common/constants/form/formRules";
import { changePassword } from "../../../services/auth";

export default function ChangePasswordModal({ isOpen, onClose }) {
    const toast = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        toast.promise(changePassword(data), {
            loading: {
                title: "Yükleniyor",
                description: "Parola güncelleniyor"
            },
            success: (res) => {
                handleClose();
                return {
                    title: res?.data?.data?.title,
                    description: res?.data?.data?.message
                };
            },
            error: (err) => ({
                title: err.title || "Hata",
                description: err.message || "Bir hata oluştu."
            })
        });
    };

    const handleClose = () => {
        reset();
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Parola Değiştir</ModalHeader>
                <ModalBody>
                    <Flex as="form" direction="column" gap="16px">
                        <FormItem errors={errors} itemName="currentPassword">
                            <Label label="Mevcut Parola" />
                            <Input
                                name="currentPassword"
                                type="password"
                                register={register}
                                errors={errors}
                                validationSchema={FORM_RULES.PASSWORD_REGISTER}
                            />
                        </FormItem>

                        <FormItem errors={errors} itemName="newPassword">
                            <Label label="Yeni Parola" />
                            <Input
                                name="newPassword"
                                type="password"
                                register={register}
                                errors={errors}
                                validationSchema={FORM_RULES.PASSWORD_REGISTER}
                            />
                        </FormItem>
                    </Flex>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={handleClose}>
                        İptal
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Güncelle
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}