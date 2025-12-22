'use client'
import React from 'react';
import { iconMap, type IconName } from './helpers/iconMap';
import { Button } from '../button';
import Input from '../input';

export interface SearchProps {
  appName?: 'web' | 'storybook';
  label?: string;
  variant?: 'default' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({
  appName = 'web',
  isDisabled = false,
  variant = 'default',
  onClick,
  onChange,
}: SearchProps) => {  
  return (
    <div className='flex border rounded-xl border-gray-300 overflow-hidden'>
      <Input placeholder="Search..." isDisabled={isDisabled} onChange={onChange} variant={variant} />
      <Button onClick={onClick} variant="search" icon='search' appName={appName} isDisabled={isDisabled} />
    </div>
  );
};
