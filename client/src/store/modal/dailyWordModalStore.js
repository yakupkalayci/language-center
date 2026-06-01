import { create } from "zustand";
import { getDailyLearningWords } from "../../services/word";

const useDailywordModalStore = create((set) => ({
    isOpen: false,
    isLoading: false,
    error: null,
    words: [],
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
    fetchWords: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getDailyLearningWords();
            const res = await response.data;
            const words = res.data.words;
            set({ words });
        } catch(err) {
            console.log("fetchWords error", err);
            set({ error: err.message });
        } finally {
            set({ isLoading: false });
        }
    }
}));

export default useDailywordModalStore;