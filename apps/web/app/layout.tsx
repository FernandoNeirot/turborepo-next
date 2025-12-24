import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import "./shared/lib/suppressSourceMapWarnings";

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
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
