import { create } from "zustand";

interface SearchState {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

export default useSearchStore;
