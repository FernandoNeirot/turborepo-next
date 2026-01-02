import React from 'react'
export interface TooltipProps {
  message?: string;
  children?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
}
const Tooltip = ({ message, children, position = 'bottom' }: TooltipProps) => {
  return (
    <div className='relative group inline-block w-full'>
      {children}
      {message && (
        <div
          className={`absolute ${
            position === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
              : position === 'bottom'
              ? 'top-full left-1/2 -translate-x-1/2 mt-2'
              : position === 'left'
              ? 'right-full top-1/2 -translate-y-1/2 mr-2'
              : 'left-full top-1/2 -translate-y-1/2 ml-2'
          } w-max max-w-xs rounded bg-gray-800 text-white text-sm p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none`}
        >
          {message}
        </div>
      )}
    </div>
  )
}

export default Tooltip