import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Noto_Sans_Myanmar } from "next/font/google";
import { site } from "@/site.config";
import { Navbar } from "@/components/layout/Navbar";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Footer } from "@/components/home/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  subsets: ["myanmar"],
  variable: "--font-noto-myanmar",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Aster | Web Developer Portfolio",
    template: "%s | Aster",
  },
  description:
    "Personal portfolio of Aster (aster-dev) - Web developer showcasing projects, technical skills, and writings.",
  keywords: [
    "Aster",
    "aster-dev",
    "portfolio",
    "web developer",
    "software engineer",
    "UCS Pyay",
  ],
  authors: [{ name: site.name }],
  verification: {
    google:
      process.env.NEXT_PUBLIC_GSC_VERIFICATION_TOKEN || "YOUR_GSC_TOKEN_HERE",
  },
  openGraph: {
    title: site.ogTitle,
    description: site.ogDescription,
    url: site.url,
    siteName: site.siteName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Portfolio`,
    description: site.twitterDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dracula"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} ${notoSansMyanmar.variable} h-full antialiased`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-grid-huge bg-base-300/90">
        <Navbar />
        {children}
        <ContactCTA />
        <Footer />
      </body>
    </html>
  );
}
