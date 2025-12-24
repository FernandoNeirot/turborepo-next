'use client'

import { useQuery } from '@tanstack/react-query';
import { getCharacters } from '../api/charactersApi';
import type { CharactersParams, CharactersResponse } from '../types';

export function useCharacters(
  params: CharactersParams = {},
  initialData?: CharactersResponse
) {
  return useQuery({
    queryKey: ['characters', params],
    queryFn: () => getCharacters(params),
    staleTime: 3600 * 1000,
    initialData: initialData,
    refetchOnMount: !initialData,
  });
}
