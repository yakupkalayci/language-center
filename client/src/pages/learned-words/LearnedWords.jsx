import { Container, Box, Text, Flex } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from "../../components/common/Icon";
import WordModal from "../../components/modal/word-modal/WordModal";

function LearnedWordsPage() {
    const {
        headings,
        tableData,
        modalType,
        openUnlearnModal,
        isOpen,
        onClose,
        editData,
        isLoading,
        error,
        pageIndex,
        totalPages,
        onPageChange,
        retry,
        dailyLearnedWordsData,
        selectedDate,
        setSelectedDate,
        handleUnlearnWord,
    } = useWordListHandler(undefined, true);

    const formattedDailyLearnedWordsData = dailyLearnedWordsData.map(data => {
        return {
            date: new Date(data.date).toLocaleDateString('tr-TR'),
            count: data.count
        };
    });

    return (
        <Container>
            <PageHeader
                title="Öğrendiğim Kelimeler"
                pageType="learnedWords"
                hasDateFilter={true}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />
            {
                tableData?.words?.length === 0 ? (
                    <Flex flexDirection={"column"} justifyContent={"center"} alignItems={"center"} gap={4} marginTop={"48px"}>
                        <Icon icon="info" size={"48"} />
                        <Text fontSize={18} fontWeight={"bold"}>Bu tarihler arasında hiç kelime öğrenmedin.</Text>
                    </Flex>
                ) : (
                    <>
                        <Box w={"100%"} h={"400px"}>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={formattedDailyLearnedWordsData} margin={{ bottom: 20 }}>
                                    <CartesianGrid stroke="#f5f5f5" />
                                    <XAxis
                                        dataKey="date"
                                        interval={0}
                                    />
                                    <YAxis />
                                    <Tooltip formatter={(value) => [value, "Kelimeler"]} />
                                    <Bar dataKey="count" fill="#7F6988" />
                                </BarChart>
                            </ResponsiveContainer>
                        </Box>
                        <WordList
                            type="page"
                            headings={headings}
                            data={tableData}
                            openModal={openUnlearnModal}
                            loading={isLoading}
                            error={error}
                            pageIndex={pageIndex}
                            totalPages={totalPages}
                            onPageChange={onPageChange}
                            retry={retry}
                            isLearnedWordsPage={true}
                        />
                        <WordModal
                            onClose={onClose}
                            isOpen={isOpen}
                            handleUnlearnWord={handleUnlearnWord}
                            modalType={modalType}
                            editData={editData}
                        />
                    </>
                )
            }
        </Container>
    )
}

export default LearnedWordsPage;