import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import "./shared/lib/suppressSourceMapWarnings";
import { AuthProvider } from "./shared/providers/AuthContext";
import Header from "./features/header";

export const metadata: Metadata = {
  title: "Bazar de oportunidades",
  description: "Encuentra las mejores ofertas y oportunidades en nuestro bazar en línea.",

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
            </>
          </QueryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
