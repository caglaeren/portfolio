import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tuğba Çağla EREN - AI & Data Science",
  description: "Tuğba Çağla EREN's portfolio. AI & Data Science Enthusiast exploring new technologies and building projects.",
  keywords: ["AI", "Data Science", "Machine Learning", "RAG", "LLM", "Python", "Portfolio"],
  authors: [{ name: "Tuğba Çağla EREN" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Tuğba Çağla EREN - AI & Data Science",
    description: "AI & Data Science Enthusiast exploring new technologies",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tuğba Çağla EREN - AI & Data Science",
    description: "AI & Data Science Enthusiast exploring new technologies",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
