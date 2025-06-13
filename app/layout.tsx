import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShootingStars } from "@/components/ui/shooting-stars";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Donum",
  description: "Create what you love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/donum_logo.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <div className="fixed inset-0 w-full h-full">
          <ShootingStars className="absolute top-0 left-0 w-full h-full z-[999999999]" minDelay={500} maxDelay={1500} starWidth={20}/>
        </div>
        {children}
      </body>
    </html>
  );
}
