import { create } from "zustand";
import { ADD_BOOK } from "@/graphqls/mutations/books";
import Client from "@/graphqls/client";

interface BookStore {
  addBook: (data: any) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export const useBookStore = create<BookStore>((set) => ({
  loading: false,
  error: null,

  addBook: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const response = await Client.mutate<{ addBooks: any }>({
        mutation: ADD_BOOK,
        variables: data,
      });

      set({
        loading: false,
      });

      return response?.data?.addBooks;
    } catch (error: any) {
      set({
        loading: false,
        error: error?.message || "Something went wrong..",
      });

      throw error;
    }
  },
}));