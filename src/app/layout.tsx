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
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 100'><defs><linearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'><stop offset='0%25' style='stop-color:%238B5CF6'/><stop offset='100%25' style='stop-color:%23EC4899'/></linearGradient></defs><text y='.85em' font-size='55' x='3' fill='url(%23g)' font-weight='bold' font-family='sans-serif' letter-spacing='-2'>TÇE</text></svg>",
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
