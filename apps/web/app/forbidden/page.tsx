import React from "react";

export const dynamic = "force-dynamic";

const Forbidden = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Acceso Prohibido
        </h2>
        <p className="text-gray-600 mb-8">
          No tienes autorización para acceder a esta página
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default Forbidden;
