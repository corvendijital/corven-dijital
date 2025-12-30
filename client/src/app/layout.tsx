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
  metadataBase: new URL('https://corvendijital.com'),
  title: {
    default: "Corven Dijital | İKAS E-Ticaret & Dijital Çözümler",
    template: "%s | Corven Dijital"
  },
  description: "İKAS e-ticaret çözümleri, SEO optimizasyonu, tema geliştirme ve özel yazılım hizmetleri sunan profesyonel dijital ajans. İstanbul merkezli dijital ajans.",
  keywords: ["İKAS", "e-ticaret", "SEO", "tema geliştirme", "dijital ajans", "web tasarım", "İstanbul", "Türkiye", "online mağaza", "e-ticaret sitesi"],
  authors: [{ name: "Corven Dijital" }],
  creator: "Corven Dijital",
  publisher: "Corven Dijital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://corvendijital.com",
    siteName: "Corven Dijital",
    title: "Corven Dijital | İKAS E-Ticaret & Dijital Çözümler",
    description: "İKAS e-ticaret çözümleri, SEO optimizasyonu, tema geliştirme ve özel yazılım hizmetleri sunan profesyonel dijital ajans.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Corven Dijital - İKAS E-Ticaret Uzmanı",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corven Dijital | İKAS E-Ticaret & Dijital Çözümler",
    description: "İKAS e-ticaret çözümleri, SEO optimizasyonu, tema geliştirme ve özel yazılım hizmetleri.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "google-site-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://corvendijital.com/#organization",
      "name": "Corven Dijital",
      "url": "https://corvendijital.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://corvendijital.com/logo.png",
        "width": 512,
        "height": 512,
      },
      "description": "İKAS e-ticaret çözümleri, SEO optimizasyonu, tema geliştirme ve özel yazılım hizmetleri sunan profesyonel dijital ajans.",
      "email": "info@corvendijital.com",
      "telephone": "+905551234567",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR",
      },
      "sameAs": [
        "https://instagram.com/corvendijital",
        "https://linkedin.com/company/corvendijital",
        "https://twitter.com/corvendijital",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://corvendijital.com/#website",
      "url": "https://corvendijital.com",
      "name": "Corven Dijital",
      "description": "İKAS E-Ticaret & Dijital Çözümler",
      "publisher": {
        "@id": "https://corvendijital.com/#organization",
      },
      "inLanguage": "tr-TR",
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://corvendijital.com/#localbusiness",
      "name": "Corven Dijital",
      "image": "https://corvendijital.com/logo.png",
      "url": "https://corvendijital.com",
      "telephone": "+905551234567",
      "email": "info@corvendijital.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "İstanbul",
        "addressCountry": "TR",
      },
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00",
      },
      "areaServed": {
        "@type": "Country",
        "name": "Turkey",
      },
      "serviceType": [
        "E-Ticaret Geliştirme",
        "SEO Optimizasyonu",
        "Web Tasarım",
        "Tema Geliştirme",
        "Özel Yazılım",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
