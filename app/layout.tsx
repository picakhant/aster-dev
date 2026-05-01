import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Aster | Full-Stack Web Developer",
  description:
    "Portfolio of Aster, a passionate full-stack web developer building clean, modern web applications using React, Next.js, Express, and Appwrite.",
  keywords: [
    "Aster",
    "Web Developer",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Express",
    "Appwrite",
    "Portfolio",
    "Software Engineer",
  ],
  authors: [{ name: "Aster" }],
  creator: "Aster",
  // OpenGraph က Telegram, Facebook စတာတွေမှာ Link ချရင် ပေါ်လာမယ့် Preview ပါ
  openGraph: {
    title: "Aster | Full-Stack Web Developer",
    description:
      "Explore my projects, case studies, and web development journey.",
    url: "https://yourdomain.com", // TODO: Vercel က ရလာမယ့် မင်းရဲ့ တကယ့် Domain ကို ပြောင်းထည့်ပါ
    siteName: "Aster's Dev Portfolio",
    type: "website",
  },
  // Twitter (X) အတွက်
  twitter: {
    card: "summary_large_image",
    title: "Aster | Full-Stack Web Developer",
    description:
      "Explore my projects, case studies, and web development journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      {/* min-h-screen နဲ့ flex-col တွဲသုံးမှ Footer က အောက်ဆုံးရောက်မှာပါ */}
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />

          {/* flex-grow က Content တွေကို တွန်းထုတ်ပြီး Footer ကို အောက်ဆုံးရောက်စေပါတယ် */}
          <main className="grow">{children}</main>

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
