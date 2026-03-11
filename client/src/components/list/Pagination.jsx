import { HStack, Button } from "@chakra-ui/react"

function Pagination(props) {

    const { totalPages, pageIndex, onPageChange } = props;

    return (
        <HStack justify="center" mt="20px" spacing={2}>
            <Button
                size="sm"
                onClick={() => onPageChange(pageIndex - 1)}
                isDisabled={pageIndex === 1}
            >
                &lt;
            </Button>

            {Array.from({ length: totalPages }).map((_, i) => (
                <Button
                    key={i}
                    size="sm"
                    variant={pageIndex === i + 1 ? "solid" : "outline"}
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </Button>
            ))}

            <Button
                size="sm"
                onClick={() => onPageChange(pageIndex + 1)}
                isDisabled={pageIndex === totalPages}
            >
                &gt;
            </Button>
        </HStack>
    )
}

export default Pagination