import { useState, useEffect } from "react";
import { getWordByDateType } from "../services/word";

function useDashboardCard(cardType) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState(null);

    const handleGetCardData = async () => {
        try {
            setIsLoading(true);
            setError(false);
            const res = await getWordByDateType(cardType, 1, 5);
            const data = res.data.data;
            setData(data);
        } catch(err) {
            console.log("handleGetCardData fetch error:", err);
            setError(true);
        } finally {
            setIsLoading(false);
        }
    }

    const retry = () => {
        handleGetCardData();
    }

    useEffect(() => {
        handleGetCardData();
    }, []);

    return {
        isLoading,
        error,
        data,
        retry
    }

}
export default useDashboardCard;
