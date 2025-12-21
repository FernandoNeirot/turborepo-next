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
      className={`btn btn-${appName}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
