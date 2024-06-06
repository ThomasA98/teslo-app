import type { Metadata } from "next";
import { atkinson } from "@/config/fonts";
import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s - Teslo | Shop',
    default: 'Home - Teslo | Shop',
  },
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${atkinson.className} flex flex-col min-h-screen justify-between`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
