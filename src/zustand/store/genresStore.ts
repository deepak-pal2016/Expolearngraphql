import { create } from "zustand";

export interface Genre {
  id: String;
  name: String;
  value: String;
  isActive: String;
}

interface GenreStore {
  genres: Genre[];
  setGenres: (genres: Genre[]) => void;
  clearGenres: () => void;
}

export const useGenreStore = create<GenreStore>((set) => ({
  genres: [],
  setGenres: (genres) => set({ genres }),
  clearGenres: () => set({ genres: [] }),
}));
