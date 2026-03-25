import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { LenisProvider } from "@/components/ui/LenisProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Ailox — AI-Powered Apps for a Better Life",
  description:
    "An ecosystem of intelligent apps built on a unified AI backend. Notes, Goals, Journal, Focus, and more — all connected.",
  keywords: ["AI apps", "productivity", "notes", "goals", "journal", "focus"],
  openGraph: {
    title: "Ailox — AI-Powered Apps for a Better Life",
    description: "An ecosystem of intelligent apps built on a unified AI backend.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="bg-[#0a0a0f] text-[#f8fafc] antialiased overflow-x-hidden">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  )
}
