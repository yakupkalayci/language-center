import { create } from "zustand";
import { persist } from "zustand/middleware";

const defaultUser = { firstName: "", lastName: "", email: "", settings: {} };

const useAuthStore = create(
  persist(
    (set) => ({
      userData: defaultUser,
      setUserData: (data) =>
        set((state) => ({
          userData: {
            ...state.userData,
            ...data,
          },
        })),
      clearUser: () => set({ userData: defaultUser }),
      logout: () => set({ userData: defaultUser }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
