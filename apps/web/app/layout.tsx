import type { Metadata } from "next";
import "./globals.css";
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
        {children}
      </body>
    </html>
  );
}
