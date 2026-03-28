import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultUser = { firstName: "", lastName: "", email: "" };

const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      userData: defaultUser,
      setToken: (data) => set({ token: data }),
      setUserData: (data) =>
        set((state) => ({
          userData: {
            ...state.userData,
            ...data,
          },
        })),
      clearToken: () => set({ token: "" }),
      clearUser: () => set({ userData: defaultUser }),
      logout: () => set({ token: "", userData: defaultUser }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
