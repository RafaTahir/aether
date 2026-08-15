import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/providers";
import { AppHeader } from "./components/app-header";
import { AppFooter } from "./components/app-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aether | Devnet prototype",
  description:
    "Explore fictional, milestone-led projects from individuals and organizations in a safe Solana devnet prototype.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${fraunces.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Providers>
          <div className="min-h-screen bg-background text-foreground">
            <AppHeader />
            {children}
            <AppFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
