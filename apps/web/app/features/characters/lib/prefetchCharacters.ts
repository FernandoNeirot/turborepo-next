import { getQueryClient, prefetchQuery } from '../../../shared/lib/react-query';
import { getCharacters } from '../api/charactersApi';
import type { CharactersParams } from '../types';

export async function prefetchCharacters(
  queryClient: ReturnType<typeof getQueryClient>,
  params: CharactersParams = {}
) {
  await prefetchQuery(
    queryClient,
    ['characters', params],
    () => getCharacters(params)
  );
}

export async function prefetchCharacter(
  queryClient: ReturnType<typeof getQueryClient>,
  id: number
) {
  const { getCharacterById } = await import('../api/charactersApi');
  
  await prefetchQuery(
    queryClient,
    ['character', id],
    () => getCharacterById(id)
  );
}
