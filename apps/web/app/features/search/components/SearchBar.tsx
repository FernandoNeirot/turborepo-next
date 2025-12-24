'use client'

import React from 'react';
import { Form } from '@fernando_neirot2/ui';

export interface SearchBarProps {
  query?: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit?: () => void;
  className?: string;
  isDisabled?: boolean;
}

export function SearchBar({
  query = '',
  onSearchChange,
  onSearchSubmit,
  className,
  isDisabled = false,
}: SearchBarProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
  };

  const handleClick = () => {
    onSearchSubmit?.();
  };

  return (
    <Form.Search
      onClick={handleClick}
      variant="search"
      onChange={handleChange}
      className={className}
      bgColor="GRAY"
      isDisabled={isDisabled}
    />
  );
}
