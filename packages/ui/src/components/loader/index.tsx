import React from "react";

export interface LoaderProps {
  isLoading?: boolean;
  message?: string;
}

export const Loader = ({
  isLoading = false,
  message = "Cargando...",
}: LoaderProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-6 flex flex-col items-center gap-4 min-w-[200px]">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        {message && (
          <p className="text-gray-700 text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Loader;
