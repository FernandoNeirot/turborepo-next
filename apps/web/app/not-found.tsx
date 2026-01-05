import Link from "next/link";

const notfound = () => {
  return (
    <div className="w-full max-w-310 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mb-4">
        Página no encontrada
      </h2>
      <p className="text-gray-500 mb-8">
        La página que buscas no existe o ha sido movida.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default notfound;
