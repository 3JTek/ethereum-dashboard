import "./globals.css";

import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import Navbar from "@/lib/client/features/navigation/components/Navbar";
import ApiClientProvider from "@/lib/client/shared/api/providers/ApiClientProvider";
import Container from "@/lib/client/shared/components/custom/Container";
import ThemeProvider from "@/lib/client/shared/style/providers/ThemeProvider";
import WalletProvider from "@/lib/client/shared/wallet/providers/WalletProvider";

const spaceGroteskSans = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereum Dashboard",
  description: "My playground for anything Ethereum related.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGroteskSans.variable} antialiased`}>
        <div className="size-full min-h-screen overflow-x-hidden flex flex-col">
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
