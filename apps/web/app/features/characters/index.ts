// Barrel exports para la feature de personajes

// Components
export { CharacterCard } from './components/CharacterCard';
export { CharacterGrid } from './components/CharacterGrid';
export { CharacterList } from './components/CharacterList';
export { CharactersHydrated } from './components/CharactersHydrated';

// Hooks
export { useCharacters } from './hooks/useCharacters';
export { useCharacter } from './hooks/useCharacter';

// API (si necesitas usarla directamente)
export { getCharacters, getCharacterById, getCharactersByIds } from './api/charactersApi';

// Store
export { useCharactersStore } from './store/charactersStore';

// SSR Helpers
export { prefetchCharacters, prefetchCharacter } from './lib/prefetchCharacters';

// Types
export type { Character, CharactersResponse, CharactersParams } from './types';
export type { CharacterCardProps } from './components/CharacterCard';
export type { CharacterGridProps } from './components/CharacterGrid';
export type { CharacterListProps } from './components/CharacterList';
export type { CharactersHydratedProps } from './components/CharactersHydrated';
