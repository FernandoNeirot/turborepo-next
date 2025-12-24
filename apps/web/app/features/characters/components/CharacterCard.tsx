'use client'

import React from 'react';
import Image from 'next/image';
import type { Character } from '../types';

export interface CharacterCardProps {
  character: Character;
  onClick?: (character: Character) => void;
  className?: string;
  priority?: boolean;
}

export function CharacterCard({
  character,
  onClick,
  className = '',
  priority = false,
}: CharacterCardProps) {
  const statusColors = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  };

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer ${className}`}
      onClick={() => onClick?.(character)}
    >
      <div className="relative w-full h-64 bg-gray-200">
        <Image
          src={character.image}
          alt={character.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          priority={priority}
        />
        <div className="absolute top-2 right-2">
          <span
            className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
              statusColors[character.status]
            }`}
          >
            {character.status}
          </span>
        </div>
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {character.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">
          {character.species} • {character.gender}
        </p>
        <p className="text-xs text-gray-500">
          {character.location.name}
        </p>
      </div>
    </div>
  );
}
