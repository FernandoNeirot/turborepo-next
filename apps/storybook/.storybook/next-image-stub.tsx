import React from 'react';

// Mock del componente Image de Next.js para Storybook
const NextImageStub = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  ...props 
}: any) => {
  return (
    <img
      src={typeof src === 'string' ? src : src?.src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      {...props}
    />
  );
};

export default NextImageStub;
