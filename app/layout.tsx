import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Livro de receitas | Inicio",
  description: "livro de receitas feito em react. By: ARTHURpvn",
  authors: [{ name: "ARTHURpvn" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="pt-br">
        <body
          className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
