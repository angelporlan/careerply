import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Importamos las fuentes
import "./globals.css";

// Configuramos las fuentes para que generen sus variables CSS
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Curator - Job Tracker",
  description: "Premium Job Application Workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      /* Esto soluciona tu error anterior de las extensiones */
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}