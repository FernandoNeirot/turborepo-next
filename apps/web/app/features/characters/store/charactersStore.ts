/**
 * Store de Zustand para estado global de personajes
 * Útil para:
 * - Favoritos
 * - Historial de búsqueda
 * - Estado de UI compartido entre componentes
 */

import { create } from 'zustand';
import type { Character } from '../types';

interface CharactersState {
  favorites: Character[];
  addFavorite: (character: Character) => void;
  removeFavorite: (characterId: number) => void;
  isFavorite: (characterId: number) => boolean;
  searchHistory: string[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

export const useCharactersStore = create<CharactersState>((set, get) => ({
  favorites: [],
  searchHistory: [],

  addFavorite: (character) =>
    set((state) => ({
      favorites: [...state.favorites, character],
    })),

  removeFavorite: (characterId) =>
    set((state) => ({
      favorites: state.favorites.filter((c) => c.id !== characterId),
    })),

  isFavorite: (characterId) =>
    get().favorites.some((c) => c.id === characterId),

  addToSearchHistory: (query) =>
    set((state) => {
      const history = [query, ...state.searchHistory.filter((q) => q !== query)].slice(0, 10);
      return { searchHistory: history };
    }),

  clearSearchHistory: () => set({ searchHistory: [] }),
}));
