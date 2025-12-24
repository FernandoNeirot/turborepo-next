'use client'

import { HydrationBoundary, type DehydratedState } from '@tanstack/react-query';
import { CharacterList } from './CharacterList';
import type { Character, CharactersParams } from '../types';

export interface CharactersHydratedProps {
  dehydratedState: unknown;
  params?: CharactersParams;
  onCharacterClick?: (character: Character) => void;
  className?: string;
}

/**
 * Componente que hidrata los datos pre-fetched del servidor
 * 
 * Este componente envuelve CharacterList con HydrationBoundary
 * para pasar los datos del servidor al cliente
 */
export function CharactersHydrated({
  dehydratedState,
  params = {},
  onCharacterClick,
  className = '',
}: CharactersHydratedProps) {
  return (
    <HydrationBoundary state={dehydratedState as DehydratedState}>
      <CharacterList
        params={params}
        onCharacterClick={onCharacterClick}
        className={className}
      />
    </HydrationBoundary>
  );
}
