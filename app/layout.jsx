import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadata untuk SEO
export const metadata = {
  title: "TUK - Tempat Uji Kompetensi | Pelatihan & Sertifikasi Profesional",
  description:
    "TUK (Tempat Uji Kompetensi) menyediakan pelatihan dan sertifikasi profesional untuk berbagai bidang industri. Dapatkan sertifikasi kompetensi yang diakui dengan jadwal pelatihan yang fleksibel.",
  keywords: [
    "TUK",
    "Tempat Uji Kompetensi",
    "pelatihan profesional",
    "sertifikasi kompetensi",
    "training center",
    "uji kompetensi",
    "sertifikasi industri",
    "pelatihan karyawan",
    "kompetensi kerja",
    "sertifikasi BNSP",
  ],
  authors: [{ name: "TUK Training Center" }],
  creator: "TUK Training Center",
  publisher: "TUK Training Center",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://tukpgn-training.com"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "32x32" }],
    apple: [{ url: "/logo.png", type: "image/png", sizes: "32x32" }],
  },
  openGraph: {
    title: "TUK - Tempat Uji Kompetensi | Pelatihan & Sertifikasi Profesional",
    description:
      "TUK (Tempat Uji Kompetensi) menyediakan pelatihan dan sertifikasi profesional untuk berbagai bidang industri. Dapatkan sertifikasi kompetensi yang diakui dengan jadwal pelatihan yang fleksibel.",
    url: "https://tuk-training.com",
    siteName: "TUK Training Center",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "TUK Training Center Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TUK - Tempat Uji Kompetensi | Pelatihan & Sertifikasi Profesional",
    description:
      "TUK (Tempat Uji Kompetensi) menyediakan pelatihan dan sertifikasi profesional untuk berbagai bidang industri.",
    images: ["/logo.png"],
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
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
