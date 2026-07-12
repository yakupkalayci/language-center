'use client';

import { useState, useEffect } from "react";
import { ApiResponse } from "../types/api";
import { Feedbacks } from "../types/feedback";

export function useFeedbacks() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Feedbacks>();
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleGetFeedbacks = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/get-feedbacks?pageIndex=${pageIndex}&pageSize=${pageSize}`);

            if (!response.ok) {
                throw new Error("Bilinmeyen bir hata oluştu");
            }

            const res = await response.json() as ApiResponse<Feedbacks>;

            if (res.status === 'success') {
                setData(res.data);
            }

        } catch (err) {
            console.log("handleGetFeedbacks fetch error");
            setError("Bilinmeyen bir hata oluştu");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetFeedbacks();
    }, [pageIndex, pageSize]);

    return {
        isLoading,
        data,
        error,
        pageIndex,
        pageSize,
        setPageIndex,
    }
}