import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import "./shared/lib/suppressSourceMapWarnings";
import { AuthProvider } from "./shared/providers/AuthContext";
import Header from "./features/header";
import { GlobalLoader } from "./shared/components/GlobalLoader";
import { projectName } from "./shared/lib/contants";

export const metadata: Metadata = {
  title: projectName,
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
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <QueryProvider>
            <div className="flex flex-col items-center flex-1">
              <Header />
              <main className="flex-1 w-full">{children}</main>
              <GlobalLoader />
            </div>
            <footer className="mt-auto py-4 text-center text-sm text-gray-500 w-full">
              Aplicacion desarrollada solo para demo tecnica. &copy; 2026
            </footer>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
