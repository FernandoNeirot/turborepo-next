import React from 'react';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, prefetchQuery } from '../shared/lib/react-query';
import { getCharacters } from '../features/characters/api/charactersApi';
import CharactersClient from './page.client';

interface CharactersPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CharactersPage({
  searchParams,
}: CharactersPageProps) {
  const params = await searchParams;
  
  const page = params.page ? Number(params.page) : 1;
  const name = params.name as string | undefined;

  const queryClient = getQueryClient();

  await prefetchQuery(
    queryClient,
    ['characters', { page, name }],
    () => getCharacters({ page, name })
  );

  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Personajes de Rick and Morty
          </h1>
          <p className="text-gray-600">
            Explora todos los personajes de la serie
          </p>
        </header>
        <HydrationBoundary state={dehydratedState}>
          <CharactersClient initialPage={page} initialName={name} />
        </HydrationBoundary>
      </div>
    </div>
  );
}

