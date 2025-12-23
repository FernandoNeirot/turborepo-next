'use client'
import React from 'react';
import { Button } from '../button';
import Input from '../input';
import { IconName } from '../button/helpers/constans';

export interface SearchProps {
  appName?: 'web' | 'storybook';
  label?: string;
  variant?: 'default' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Search = ({
  isDisabled = false,
  variant = 'default',
  onClick,
  onChange,
  className
}: SearchProps) => {  
  return (
    <div className={`flex border rounded-xl border-gray-300 overflow-hidden ${className}`}>
      <Input placeholder="Search..." isDisabled={isDisabled} onChange={onChange} variant={variant} />
      <Button onClick={onClick} variant="search" icon='search' isDisabled={isDisabled} />
    </div>
  );
};
