import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import "./shared/lib/suppressSourceMapWarnings";
import { AuthProvider } from "./shared/providers/AuthContext";
import Header from "./features/header";
import { GlobalLoader } from "./shared/components/GlobalLoader";

export const metadata: Metadata = {
  title: "Mercado del Emprendedor",
  description:
    "Encuentra las mejores ofertas y oportunidades en nuestro bazar en línea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="es">
      <body className="flex flex-col items-center min-h-screen">
        <AuthProvider>
          <QueryProvider>
            <>
              <Header />
              {children}
              <GlobalLoader />
            </>
          </QueryProvider>
        </AuthProvider>
        <div className="mt-50 mb-4 text-center text-sm text-gray-500">
          Aplicacion desarrollada solo para demo tecnica. &copy; 2026
        </div>
      </body>
    </html>
  );
}
