'use client'

import { useQuery } from '@tanstack/react-query';
import { getCharacterById } from '../api/charactersApi';
import type { Character } from '../types';

export function useCharacter(id: number, initialData?: Character) {
  return useQuery({
    queryKey: ['character', id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    initialData: initialData,
    refetchOnMount: !initialData,
  });
}
