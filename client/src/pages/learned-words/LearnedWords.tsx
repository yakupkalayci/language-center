import { Container, Box } from "@chakra-ui/react";
import useWordListHandler from "../../hooks/useWordListHandlers";
import PageHeader from "../../components/header/PageHeader";
import WordList from "../../components/list/WordList";
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';


function LearnedWordsPage() {
    const {
        headings,
        tableData,
        openEditModal,
        openDeleteModal,
        isLoading,
        error,
        pageIndex,
        totalPages,
        onPageChange,
        retry,
        dailyLearnedWordsData
    } = useWordListHandler(undefined, true);

    return (
        <Container>
            <PageHeader
                title="Öğrendiğim Kelimeler"
                pageType="learnedWords"
            />
            <Box w={"100%"} h={"400px"}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={dailyLearnedWordsData} margin={{ bottom: 20 }}>
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis
                            dataKey="learnedAt"
                            interval={0}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#d6154c" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            <WordList
                type="page"
                headings={headings}
                data={tableData}
                openModal={openEditModal}
                openDeleteModal={openDeleteModal}
                loading={isLoading}
                error={error}
                pageIndex={pageIndex}
                totalPages={totalPages}
                onPageChange={onPageChange}
                retry={retry}
                isLearnedWordsPage={true}
            />
        </Container>
    )
}

export default LearnedWordsPage;