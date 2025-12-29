import React from 'react'
export interface TooltipProps {
  message?: string;
  children?: React.ReactNode;
}
const Tooltip = ({ message, children }: TooltipProps) => {
  return (
    <div className='relative group inline-block w-full'>
      {children}
      {message && (
        <div className='absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs rounded bg-gray-800 text-white text-sm p-2 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all pointer-events-none'>
          {message}
        </div>
      )}
    </div>
  )
}

export default Tooltip