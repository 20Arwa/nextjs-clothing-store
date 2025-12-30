import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clothes store | Modern Clothing Store",
  description: "Clothes store is an online clothing store offering modern and trendy fashion for Male and Female. Browse collections, discover new styles, and shop with ease.",
  keywords: [
    "Clothes store",
    "Online Clothing Store",
    "Fashion Store",
    "Modern Fashion",
    "Male Clothing",
    "Female Clothing",
    "Clothing Collections",
    "Shop Clothes Online",
    "Fashion Ecommerce",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <main>
          {children}
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
