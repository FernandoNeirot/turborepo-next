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
      <body>
        <AuthProvider>
          <QueryProvider>
            <>
              <Header />
              {children}
              <GlobalLoader />
            </>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
