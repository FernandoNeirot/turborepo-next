'use client'

import React from 'react';
import { CharacterCard } from './CharacterCard';
import type { Character } from '../types';

export interface CharacterGridProps {
  characters: Character[];
  onCharacterClick?: (character: Character) => void;
  className?: string;
}

export function CharacterGrid({
  characters,
  onCharacterClick,
  className = '',
}: CharacterGridProps) {
  if (characters.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No se encontraron personajes</p>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {characters.map((character, index) => (
        <CharacterCard
          key={character.id}
          character={character}
          onClick={onCharacterClick}
          // Solo las primeras imágenes (above the fold) tienen priority
          priority={index < 5}
        />
      ))}
    </div>
  );
}
