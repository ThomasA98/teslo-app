import type { Metadata } from "next";
import { atkinson } from "@/config/fonts";
import "./globals.css";
import { Provider } from "@/components";

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
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
