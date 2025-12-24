import type { Character, CharactersResponse, CharactersParams } from '../types';

const API_BASE_URL = 'https://rickandmortyapi.com/api';

function buildQueryParams(params: CharactersParams): string {
  const searchParams = new URLSearchParams();
  
  if (params.page) searchParams.append('page', params.page.toString());
  if (params.name) searchParams.append('name', params.name);
  if (params.status) searchParams.append('status', params.status);
  if (params.species) searchParams.append('species', params.species);
  if (params.type) searchParams.append('type', params.type);
  if (params.gender) searchParams.append('gender', params.gender);

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
}

export async function getCharacters(
  params: CharactersParams = {}
): Promise<CharactersResponse> {
  const queryString = buildQueryParams(params);
  const url = `${API_BASE_URL}/character${queryString}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener personajes: ${response.statusText}`);
  }

  return response.json();
}

export async function getCharacterById(id: number): Promise<Character> {
  const url = `${API_BASE_URL}/character/${id}`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener personaje: ${response.statusText}`);
  }

  return response.json();
}

export async function getCharactersByIds(
  ids: number[]
): Promise<Character[]> {
  const url = `${API_BASE_URL}/character/${ids.join(',')}`;

  const response = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Error al obtener personajes: ${response.statusText}`);
  }

  const data = await response.json();
  return Array.isArray(data) ? data : [data];
}
