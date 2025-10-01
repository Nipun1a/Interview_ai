import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interview.AI",
  description: "An AI-powered interview practice tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white min-h-screen`}
      >
        {/* ---- NAVBAR ---- */}
        <nav className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="logo" height={32} width={38} />
            <h2 className="text-primary-100 text-xl font-semibold">
              Interview.AI
            </h2>
          </Link>
        </nav>

        {/* ---- PAGE CONTENT ---- */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
