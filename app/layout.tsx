import "./globals.css";

import Container from "@lib/shared/components/custom/Container";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Navbar from "@/lib/features/navigation/components/Navbar";
import ApiClientProvider from "@/lib/shared/api/providers/ApiClientProvider";
import ThemeProvider from "@/lib/shared/style/providers/ThemeProvider";
import WalletProvider from "@/lib/shared/wallet/providers/WalletProvider";

const spaceGroteskSans = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGroteskSans.variable} antialiased`}>
        <div className=" size-full min-h-screen overflow-x-hidden flex flex-col">
          <ThemeProvider>
            <WalletProvider>
              <ApiClientProvider>
                <Navbar />
                <Container>{children}</Container>
              </ApiClientProvider>
            </WalletProvider>
          </ThemeProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
