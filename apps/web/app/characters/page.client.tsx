'use client'

import React, { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CharacterList, useCharactersStore, type Character } from '../features/characters';
import { SearchBar } from '../features/search';
import { Form } from '@fernando_neirot2/ui';

interface CharactersClientProps {
  initialPage?: number;
  initialName?: string;
}

export default function CharactersClient({
  initialPage = 1,
  initialName = '',
}: CharactersClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  
  const [searchQuery, setSearchQuery] = useState(initialName);
  const [page, setPage] = useState(initialPage);
  const { addFavorite, isFavorite, removeFavorite } = useCharactersStore();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set('name', query);
      } else {
        params.delete('name');
      }
      params.set('page', '1');
      router.push(`/characters?${params.toString()}`);
    });
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/characters?${params.toString()}`);
  };

  const handleCharacterClick = (character: Character) => {
    console.log('Character clicked:', character);
  };

  const handleToggleFavorite = (character: Character) => {
    if (isFavorite(character.id)) {
      removeFavorite(character.id);
    } else {
      addFavorite(character);
    }
  };

  return (
    <>
      <div className="mb-6">
        <SearchBar
          query={searchQuery}
          onSearchChange={handleSearchChange}
          className="max-w-md"
        />
      </div>

      <CharacterList
        params={{
          name: searchQuery || undefined,
          page,
        }}
        onCharacterClick={handleCharacterClick}
      />

      <div className="mt-8 flex justify-center gap-4">
        <Form.Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1 || isPending}
          label='Anterior'
          backgroundColor='BLUE'
        />        
        <span className="px-4 py-2 flex items-center">
          {isPending && (
            <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900 mr-2"></span>
          )}
          Página {page}
        </span>
        <Form.Button
          onClick={() => handlePageChange(page + 1)}
          isDisabled={isPending}
          label='Siguiente'
          backgroundColor='BLUE'
        />
        
      </div>
    </>
  );
}
