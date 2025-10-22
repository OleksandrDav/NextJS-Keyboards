import { create } from "zustand";

interface State {
    activeId: string | null;
    setActiveId: (activeId: string) => void;
}


export const useCategoryStore = create<State>((set) => ({
    activeId: null, // Initial value is now null
    setActiveId: (activeId) => set({ activeId }), // Accepts a string
}));

