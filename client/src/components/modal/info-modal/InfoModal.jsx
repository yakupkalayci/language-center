import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Box, Button, Text } from "@chakra-ui/react";
import useModalStore from "../../../store/modal/modalStore";

function InfoModal() {

    const { isOpen, close, title, message, status, actions } = useModalStore();

    const renderActions = () => {
        if (!actions.length) return;
        return actions.map(({ onClick, label, variant }) => {
            return <Button onClick={onClick} width="100%" marginBottom="12px" borderRadius="20px" variant={variant}>{label}</Button>
        })
    }

    return (
        <Modal onClose={close} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign="center">
                    <Box
                        as="i"
                        className={status === 'success' ? 'icon-success' : 'icon-info'}
                        color={status === 'success' ? "alert.success" : "alert.danger"}
                        fontSize="36px"
                        display="block"
                        marginBottom="24px"
                    />
                    {title}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody textAlign="center">
                    <Text marginBottom="16px">{message}</Text>
                    {renderActions()}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default InfoModal;