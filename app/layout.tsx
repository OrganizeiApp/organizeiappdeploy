import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Nunito } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const font = Nunito({subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Organizei",
  description: "Organizei é a sua estante digital!",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/desenho.svg",
        href: "/desenho.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/desenho.svg",
        href: "/desenho.svg",
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  const session = await auth();

  return (
    <SessionProvider session={session}>
    <html lang="pt-br" suppressHydrationWarning>
      <body className={font.className}>    
          {children}
        </body>
    </html>
    </SessionProvider>
  );
}
