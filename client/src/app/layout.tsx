import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Corven Dijital | İKAS E-Ticaret & Dijital Çözümler",
  description: "İKAS e-ticaret çözümleri, SEO optimizasyonu, tema geliştirme ve özel yazılım hizmetleri sunan profesyonel dijital ajans.",
  keywords: "İKAS, e-ticaret, SEO, tema geliştirme, dijital ajans, web tasarım",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
