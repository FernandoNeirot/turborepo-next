import React from 'react';

// Tailwind classes used: px-4 py-2 rounded font-semibold transition-colors bg-blue-500 text-white hover:bg-blue-600 bg-purple-500 hover:bg-purple-600

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
  // Usar clases completas directamente en el className para que Tailwind las detecte
  // Tailwind v4 necesita ver las clases completas en el código
  return (
    <button
      type="button"
      style={{color: appName === 'web' ? 'green' : 'purple'}}
      className={
        appName === 'web' ?"bg-red-200":"bg-purple-600"
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};
