export interface SearchState {
  query: string;
  isSearching: boolean;
}

export interface UseSearchReturn {
  query: string;
  isSearching: boolean;
  handleSearch: (query: string) => void;
  handleSearchSubmit: () => void;
  clearSearch: () => void;
}
