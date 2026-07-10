'use client';

import { Geist, Geist_Mono } from "next/font/google";
import AppInitializer from "./AppInitializer";
import Header from "@/app/components/layout/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col justify-between min-h-screen`}
      >
        <AppInitializer>
          <Header />
          <main className="flex-1 bg-[#F8F9FA]">{children}</main>
        </AppInitializer>
      </body>
    </html>
  );
}
