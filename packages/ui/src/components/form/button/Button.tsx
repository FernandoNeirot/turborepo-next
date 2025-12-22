import React from 'react';

export interface ButtonProps {
  appName?: 'web' | 'storybook';
  label?: string;
  onClick?: () => void;
}

export const Button = ({
  appName='web',
  label = 'Button',
  onClick,
}: ButtonProps) => {
  
  return (
    <button
      type="button"
      className={`text-black bg-red-500 btn-${appName}`}
      onClick={onClick}
    >
      {label}-
    </button>
  );
};
