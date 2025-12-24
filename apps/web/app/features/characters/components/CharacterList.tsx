'use client'

import React from 'react';
import { CharacterGrid } from './CharacterGrid';
import { useCharacters } from '../hooks/useCharacters';
import type { CharactersParams, Character } from '../types';

export interface CharacterListProps {
  params?: CharactersParams;
  onCharacterClick?: (character: Character) => void;
  className?: string;
}

export function CharacterList({
  params = {},
  onCharacterClick,
  className = '',
}: CharacterListProps) {
  const { data, isLoading, error, isFetching } = useCharacters(params);

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2 text-gray-500">Cargando personajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          Error al cargar personajes: {error.message}
        </p>
      </div>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron personajes</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {isFetching && !isLoading && (
        <div className="mb-4 text-center text-sm text-gray-500">
          Actualizando...
        </div>
      )}
      <CharacterGrid
        characters={data.results}
        onCharacterClick={onCharacterClick}
      />
      {data.info && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Página {params.page || 1} de {data.info.pages} • Total: {data.info.count} personajes
        </div>
      )}
    </div>
  );
}
