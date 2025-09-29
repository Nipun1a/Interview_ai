import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Image from "next/image"; 

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
  description: "an ai powered inteview practice tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return(
    <div className="root-layout">
    <nav>
    <Link href = "/" className="flex items-center gap-2">
    <Image src="/logo.svg" alt="logo" height={32} width={38} />
    <h2 className="text-primary-100 text-xl font-semibold">
            Interview.AI
          </h2>
    </Link>
    </nav>

    </div>
  );
}
