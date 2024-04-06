import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "./globals.css";
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

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
    <html lang="en" suppressHydrationWarning className={cn(
      "min-h-screen bg-background font-sans antialiased",
      `${GeistSans.variable} ${GeistMono.variable}`
    )}>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
      <body>
      <div className="absolute inset-0 h-full w-full bg-background bg-[radial-gradient(gray,transparent_1px)] [background-size:16px_16px]">
        <main>{children}</main>
        <Toaster />
      </div>
      <Analytics />
      <SpeedInsights />
      </body>
      </ThemeProvider>
    </html>
  );
}
