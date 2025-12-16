import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cloud Weather - Real-time Cloud Service Status Monitor",
    template: "%s | Cloud Weather"
  },
  description: "Monitor the status of major cloud services (AWS, Cloudflare, GitHub, Vercel) in real-time with an intuitive weather-based interface. Stay updated on service health and incidents.",
  keywords: [
    "cloud status",
    "service monitoring",
    "AWS status",
    "Cloudflare status",
    "GitHub status",
    "Vercel status",
    "cloud services",
    "uptime monitor",
    "service health",
    "incident tracking",
    "status page",
    "cloud weather"
  ],
  authors: [{ name: "Cloud Weather Team" }],
  creator: "Cloud Weather",
  publisher: "Cloud Weather",
  manifest: "/manifest.json",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Cloud Weather - Real-time Cloud Service Status Monitor",
    description: "Monitor the status of major cloud services (AWS, Cloudflare, GitHub, Vercel) in real-time with an intuitive weather-based interface.",
    siteName: "Cloud Weather",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cloud Weather - Cloud Service Status Monitor",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "Cloud Weather - Real-time Cloud Service Status Monitor",
    description: "Monitor the status of major cloud services in real-time with an intuitive weather-based interface.",
    images: ["/twitter-image.png"],
    creator: "@cloudweather",
  },

  // Apple Web App
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Cloud Weather",
  },

  // Format Detection
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  // Icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add your verification codes when deploying)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="font-sans">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
