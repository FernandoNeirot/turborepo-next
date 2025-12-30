import React from 'react';
import { Button } from '../button';
import Input from '../input';
import { BUTTON_BACKGROUND_COLORS, IconName } from '../button/helpers/constans';

export interface SearchProps {
  appName?: 'web' | 'storybook';
  label?: string;
  variant?: 'default' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  bgColor?: keyof typeof BUTTON_BACKGROUND_COLORS;
}

export const Search = ({
  isDisabled = false,
  variant = 'default',
  onClick,
  onChange,
  className,
  bgColor="BLUE"
}: SearchProps) => {  
  return (
    <div className={`flex border rounded-xl border-gray-300 overflow-hidden ${className}`}>
      <Input placeholder="Buscar..." isDisabled={isDisabled} onChange={onChange} variant={variant} />
      <Button onClick={onClick} variant="search" icon='search' isDisabled={isDisabled} backgroundColor={bgColor} />
    </div>
  );
};
