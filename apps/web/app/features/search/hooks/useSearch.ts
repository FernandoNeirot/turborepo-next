'use client'

import { useState, useCallback } from 'react';
import type { UseSearchReturn } from '../types';

export function useSearch(initialQuery?: string): UseSearchReturn {
  const [query, setQuery] = useState(initialQuery || '');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
  }, []);

  const handleSearchSubmit = useCallback(() => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    console.log('Searching for:', query);
    
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  }, [query]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);

  return {
    query,
    isSearching,
    handleSearch,
    handleSearchSubmit,
    clearSearch,
  };
}
