import React from "react";

export interface LoaderProps {
  isLoading?: boolean;
  message?: string;
}

export const Loader = ({ isLoading = false }: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
      <div className="p-6 flex flex-col items-center gap-4 min-w-50">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
