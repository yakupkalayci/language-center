import { create } from "zustand";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string[];
}

type AuthStore = {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,

    checkAuth: async () => {
        try {
            const res = await api.get("/auth/me");

            set({
                isAuthenticated: true,
                user: res.data,
                loading: false,
            });
        } catch {
            set({
                isAuthenticated: false,
                user: null,
                loading: false,
            });
        }
    },
}));