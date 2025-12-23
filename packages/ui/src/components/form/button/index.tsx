'use client'
import React from 'react';
import { BUTTON_BACKGROUND_COLORS, iconMap, type IconName } from './helpers/constans';

export interface ButtonProps {
  backgroundColor?: typeof BUTTON_BACKGROUND_COLORS[keyof typeof BUTTON_BACKGROUND_COLORS];
  label?: string;
  variant?: 'default' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
}

export const Button = ({
  icon,
  backgroundColor = BUTTON_BACKGROUND_COLORS.BLUE,
  isDisabled = false,
  label,
  variant = 'default',
  onClick,
}: ButtonProps) => {
  const IconComponent = icon && icon !== 'none' ? iconMap[icon].icon : null;
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`
      shadow-md px-2 py-2 rounded${variant === 'search' ? '-r-xl' : '-lg'} font-semibold transition-colors text-white flex items-center
      ${isDisabled ?
        "bg-gray-400 cursor-not-allowed hover:bg-gray-400" :
        backgroundColor
      }
      `}
      onClick={() => isDisabled ? undefined : onClick()}
    >
      {IconComponent && <IconComponent className="w-5 h-5" />}
      {
      label &&
      <span className={`${IconComponent ? 'ml-2' : ''}`}>
        {label}
      </span>
      }
    </button>
  );
};
