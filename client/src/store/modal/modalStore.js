import { create } from "zustand";

const useModalStore = create((set) => ({
    isOpen: false,
    status: null,
    actions: [],
    title: "",
    message: "",
    open: (data) => set({ isOpen: true, title: data.title, message: data.message }),
    close: () => set({ isOpen: false }),
    setActions: (data) => set({actions: data}),
    setStatus: (data) => set({status: data}),
}));

export default useModalStore;