import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Ethan Waldo",
  description: "Ethan Waldo Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(
      "min-h-screen bg-background font-sans antialiased",
      `${GeistSans.variable} ${GeistMono.variable}`
    )}>
      <body>{children}</body>
    </html>
  );
}
