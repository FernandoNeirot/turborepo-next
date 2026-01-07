import type { Metadata, Viewport } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import "./shared/lib/suppressSourceMapWarnings";
import { AuthProvider } from "./shared/providers/AuthContext";
import Header from "./features/header";
import { GlobalLoader } from "./shared/components/GlobalLoader";
import { projectName } from "./shared/lib/contants";

export const metadata: Metadata = {
  title: {
    default: projectName,
    template: `%s | ${projectName}`,
  },
  description:
    "Encuentra las mejores ofertas y oportunidades en nuestro bazar en línea.",
  keywords: ["bazar", "ofertas", "productos", "mercado", "emprendedor"],
  authors: [{ name: "Mercado del Emprendedor" }],
  creator: "Mercado del Emprendedor",
  publisher: "Mercado del Emprendedor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: process.env.NEXT_PUBLIC_BASE_URL
    ? new URL(process.env.NEXT_PUBLIC_BASE_URL)
    : undefined,
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: projectName,
    title: projectName,
    description:
      "Encuentra las mejores ofertas y oportunidades en nuestro bazar en línea.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#1e40af",
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
