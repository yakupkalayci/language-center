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
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: true,
    isAuthenticated: false,

    checkAuth: async () => {
        try {
            const res = await fetch("/api/me", { credentials: 'include' });
            if (!res.ok) {
                if (res.status === 401) {
                    set({
                        isAuthenticated: false,
                        user: null,
                        loading: false,
                    });
                }
            }

            const response = await res.json();

            set({
                isAuthenticated: true,
                user: response.data.user,
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
    logout: async () => {
        try {
            await fetch("/api/logout", { method: 'POST', credentials: 'include' });
            set({
                isAuthenticated: false,
                user: null,
                loading: false,
            });
        } catch(err) {
            console.log("logout fetch error:", err);
        }
    }
}));