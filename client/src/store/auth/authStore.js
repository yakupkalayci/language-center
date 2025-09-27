import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: "",
      userData: { firstName: "", lastName: "", email: ""},
      setToken: (data) => set({ token: data }),
      setUserData: (data) =>
        set((state) => ({
          userData: {
            ...state.userData,
            ...data,
          },
        })),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
