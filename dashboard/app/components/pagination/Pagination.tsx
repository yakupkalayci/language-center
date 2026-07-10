interface PaginationProps {
    totalPages: number;
    pageIndex: number;
    onPageChange: (page: number) => void;
}

function Pagination(props: PaginationProps) {

    const { totalPages, pageIndex, onPageChange } = props;

    return (
        <div className="flex justify-center items-center mt-[20px] gap-2">
            <button
                className=""
                onClick={() => onPageChange(pageIndex - 1)}
                disabled={pageIndex === 1}
            >
                &lt;
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    className="rounded-[6px] inline-flex items-center h-[32px] bg-[#EDF2F7]"
                    onClick={() => onPageChange(i + 1)}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(pageIndex + 1)}
                disabled={pageIndex === totalPages}
            >
                &gt;
            </button>
        </div>
    )
}

export default Pagination