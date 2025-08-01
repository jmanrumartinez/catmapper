import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "@/components/providers";
import { NavigationBar } from "@/components/shared/navigation/NavigationBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catmapper - Find the next house for your cat",
  description:
    "Catmapper helps you discover and buy the perfect property for your feline friend. Browse listings, view details, and find your cat's next home with ease.",
  keywords:
    "real estate, property, NFT, blockchain, cat homes, real estate marketplace",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
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
        <Providers>
          <div className="w-full">
            <NavigationBar />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
