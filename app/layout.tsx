import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import PageTransition from "./components/ui/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thaliak.vercel.app"),
  title: {
    default: "Thaliak — Guides de raid FFXIV",
    template: "%s | Thaliak",
  },
  description:
    "Guides stratégiques communautaires pour les raids de Final Fantasy XIV. Mécaniques, positionnements et outils pour la communauté EU francophone.",
  keywords: [
    "FFXIV",
    "Final Fantasy XIV",
    "guide raid",
    "savage",
    "ultimate",
    "extrême",
    "mécaniques",
    "stratégie",
    "communauté",
    "francophone",
  ],
  authors: [{ name: "Edwin Dijeont" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://thaliak.vercel.app",
    siteName: "Thaliak",
    title: "Thaliak — Guides de raid FFXIV",
    description: "Guides stratégiques pour les raids de Final Fantasy XIV.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Thaliak — Guides de raid FFXIV",
    description: "Guides stratégiques pour les raids de Final Fantasy XIV.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-invoke-path") || "";
  const isKeystatic = pathname.startsWith("/keystatic");

  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {!isKeystatic && <Navbar />}
        <PageTransition>{children}</PageTransition>
        {!isKeystatic && <Footer />}
      </body>
    </html>
  );
}
