import { create } from "zustand";

export interface Language {
  id: String;
  name: String;
  value: String;
  isActive: String;
}

interface LuangeStore {
  languages: Language[];
  setLanguages: (languages: Language[]) => void;
  cleanLanguages: () => void;
}

export const useLanguageStore = create<LuangeStore>((set) => ({
  languages: [],
  setLanguages: (languages) => set({ languages }),
  cleanLanguages: () => set({ languages: [] }),
}));
