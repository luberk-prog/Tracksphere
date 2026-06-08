import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "TrackSphere — Fitness, Social, Safety",
  description:
    "Track your activities, share your journey, stay safe. The all-in-one fitness, social networking, and safety platform.",
  keywords: [
    "fitness tracker",
    "GPS tracking",
    "social fitness",
    "running",
    "cycling",
    "live location",
    "safety",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
