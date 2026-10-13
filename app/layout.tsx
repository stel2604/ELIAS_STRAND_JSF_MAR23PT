import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header"; // 1. Importer Header her
import { SearchProvider } from "@/context/SearchContext";
import CartToast from "@/components/CartToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr.Duh BMW butikk",
  description: "Velkommen til butikken min!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="no" className={`${geistSans.variable} ${geistMono.variable}`}>
    <body>
    <CartProvider>
      <SearchProvider>
        <Header />
        {children}
      </SearchProvider>

      <CartToast />
    </CartProvider>
    </body>
    </html>
  );
}
