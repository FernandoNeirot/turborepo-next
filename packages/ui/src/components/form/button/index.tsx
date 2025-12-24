import React from 'react';
import { BUTTON_BACKGROUND_COLORS, iconMap, type IconName } from './helpers/constans';

export interface ButtonProps {
  backgroundColor?: keyof typeof BUTTON_BACKGROUND_COLORS;
  label?: string;
  size?: 'small' | 'default';
  variant?: 'default' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
}

export const Button = ({
  icon,
  backgroundColor = 'RED',
  size = 'default',
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
      ${size === 'small' ? 'px-3 text-sm' : 'px-4 py-2 text-base'}
      shadow-md px-2 rounded${variant === 'search' ? '-r-xl' : '-lg'} font-semibold transition-colors flex items-center justify-center
      ${isDisabled ?
          "bg-gray-200 cursor-not-allowed text-gray-300" :
          `${BUTTON_BACKGROUND_COLORS[backgroundColor]} cursor-pointer  text-white`
        }
      `}
      onClick={() => isDisabled ? undefined : onClick()}
    >
      {IconComponent && <IconComponent className={`${size === 'small' ? 'w-4 h-4' : 'w-5 h-5'}`} />}
      {
        label &&
        <span className={`${IconComponent ? 'ml-2' : ''}`}>
          {label}
        </span>
      }
    </button>
  );
};
