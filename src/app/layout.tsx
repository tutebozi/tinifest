import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserButton from "./components/UserButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tinifest - Eventos",
  description: "Plataforma de venta de tickets para eventos",
  icons: {
    other: [
      {
        rel: "icon",
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎉</text></svg>"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎉</text></svg>"
          type="image/svg+xml"
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-900`}>
        <header className="bg-gray-900 py-4">
          <div className="container mx-auto px-4 flex justify-end items-center">
            <UserButton />
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
} 