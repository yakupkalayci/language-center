import { useState, useEffect } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Button, Box, Text, useToast } from '@chakra-ui/react';
import useDailywordModalStore from '../../../store/modal/dailyWordModalStore';
import Icon from '../../common/Icon';
import { speakText } from '../../../utils/speech';
import { markWordAsLearned } from '../../../services/word';

function DailyWordsModal() {

    // store variables
    const { isOpen, close, words, fetchWords, isLoading, error } = useDailywordModalStore();
    const [isHoveredLeftArrow, setIsHoveredLeftArrow] = useState(false);
    const [isHoveredRightArrow, setIsHoveredRightArrow] = useState(false);
    const [activeWordIndex, setActiveWordIndex] = useState(0);

    // methods
    const handleNavigateWords = (type) => {
        if (type === "prev") {
            const prevIndex = activeWordIndex - 1 < 0 ? words.length - 1 : activeWordIndex - 1;
            setActiveWordIndex(prevIndex);
            handleMarkWordAsLearned();
        } else if (type === "next") {
            const nextIndex = activeWordIndex + 1 > words?.length - 1 ? 0 : activeWordIndex + 1;
            setActiveWordIndex(nextIndex);
            handleMarkWordAsLearned();
        }
    }

    const handleClose = () => {
        setActiveWordIndex(0);
        close();
    }

    const handleMarkWordAsLearned = async () => {
        const wordId = words?.[activeWordIndex]?.id;
        if (!wordId) return;
        await markWordAsLearned(wordId);
    }

    // effects
    useEffect(() => {
        if (isOpen) {
            fetchWords();
        }
    }, [isOpen]);

    return (
        <Modal onClose={handleClose} isOpen={isOpen} isCentered size={"xl"}>
            <ModalOverlay />
            <ModalContent bgColor={"primary.pink"} color="base.white">
                <ModalHeader>
                    Bugün Öğreneceğin Kelimeler
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Flex
                        flexDirection={"column"}
                        bgColor="primary.pink"
                        color={"base.white"}
                        borderRadius={"lg"}
                        padding={4}
                    >
                        {
                            isLoading ? <Text>Yükleniyor...</Text> :
                                error ? <Text color="alert.danger">{error}</Text> : (
                                    <>
                                        <Box>
                                            <Flex
                                                w={"100%"}
                                                justifyContent={"center"}
                                                alignItems={"center"}
                                                gap={4}
                                            >
                                                <Flex alignItems={"baseline"} gap={2} fontWeight={"bold"}>
                                                    {/* Word */}
                                                    <Text fontSize={"xl"}>{words?.[activeWordIndex]?.word}</Text>
                                                    {/* Type */}
                                                    <Text fontSize={"small"}>({words?.[activeWordIndex]?.type})</Text>
                                                </Flex>
                                                <Box
                                                    as="i"
                                                    className="icon-volume-up"
                                                    cursor="pointer"
                                                    fontWeight="600"
                                                    fontSize="20px"
                                                    color="#3898FF"
                                                    display="inline-block"
                                                    transition="all 0.1s ease"
                                                    _hover={{
                                                        transform: "scale(1.1)",
                                                    }}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-label={`Sesli oku: ${"BOOK"}`}
                                                    onClick={() => speakText("book", "en-US").catch(() => { })}
                                                    onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') speakText("book", "en-US").catch(() => { }); }}
                                                />
                                            </Flex>
                                        </Box>
                                        <Box
                                            marginTop={6}
                                            textAlign={"center"}
                                        >
                                            <Text fontWeight={"bold"}>{words?.[activeWordIndex]?.example}</Text>
                                        </Box>
                                    </>
                                )
                        }
                    </Flex>
                </ModalBody>
                <ModalFooter borderTop={"2px solid black"} marginTop={"24px"}>
                    <Flex justifyContent={"center"} alignItems={"center"} gap={8}>
                        <Icon
                            onMouseEnter={() => setIsHoveredLeftArrow(true)}
                            onMouseLeave={() => setIsHoveredLeftArrow(false)}
                            icon="arrow-right" size="36px" cursor="pointer" style={{
                                transform: isHoveredLeftArrow ? "rotate(180deg) scale(1.2)" : "rotate(180deg) scale(1)",
                                transition: "0.2s",
                            }}
                            onClick={() => handleNavigateWords("prev")}
                        />
                        <Icon
                            onMouseEnter={() => setIsHoveredRightArrow(true)}
                            onMouseLeave={() => setIsHoveredRightArrow(false)}
                            icon="arrow-right" size="36px" cursor="pointer" style={{
                                transform: isHoveredRightArrow ? 'scale(1.2)' : "scale(1)",
                                transition: "0.2s",
                            }}
                            onClick={() => handleNavigateWords("next")}
                        />
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DailyWordsModal;