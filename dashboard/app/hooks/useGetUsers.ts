'use client';

import { useState, useEffect } from "react";
import { Users } from "../types/users";
import { ApiResponse } from "../types/api";

export function useGetUsers() {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Users>();
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handleGetUsers = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/users?pageIndex=${pageIndex}&pageSize=${pageSize}`);
            
            if(!response.ok) {
                throw new Error("Bilinmeyen bir hata oluştu");
            }

            const res = await response.json() as ApiResponse<Users>;

            if(res.status === 'success') {
                setData(res.data);
            }

        } catch (err) {
            console.log("handleGetUsers fetch error");
            setError("Bilinmeyen bir hata oluştu");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleGetUsers();
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