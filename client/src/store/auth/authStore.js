import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      userData: "",
      setUserData: (data) => set({ userData: data }),
    }),
    { name: "auth-store" }
  )
);

export default useAuthStore;
