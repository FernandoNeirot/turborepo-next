'use client'
import React from 'react';
import { iconMap, type IconName } from './helpers/iconMap';

export interface ButtonProps {
  appName?: 'web' | 'storybook';
  label?: string;
  variant?: 'default' | 'delete' | 'search'
  isDisabled?: boolean;
  onClick: () => void;
  icon?: IconName;
}

export const Button = ({
  icon,
  appName = 'web',
  isDisabled = false,
  label,
  variant = 'default',
  onClick,
}: ButtonProps) => {
  const IconComponent = icon ? iconMap[icon].icon : null;
  return (
    <button
      disabled={isDisabled}
      type="button"
      className={`
        px-2 py-2 rounded${variant === 'search' ? '-r-xl' : '-md'} font-semibold transition-colors text-white flex items-center
        ${isDisabled ?
          "bg-gray-400 cursor-not-allowed hover:bg-gray-400" :
          variant === 'delete' ?
          appName === 'web' ?
            "bg-red-500 hover:bg-red-600" :
            "bg-purple-600 hover:bg-purple-700" :
          appName === 'web' ?
            "bg-blue-500 hover:bg-blue-600" :
            "bg-purple-600 hover:bg-purple-700"}
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
