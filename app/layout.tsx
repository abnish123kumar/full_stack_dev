import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import React from "react";

// Font Initialization
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next.js App",
  description: "A simple Next.js app with a background image.",
};

// ✅ Corrected Layout Component
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-hero-pattern bg-cover bg-center h-screen w-full antialiased`}>
        {children}
      </body>
    </html>
  );
}
