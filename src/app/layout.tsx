import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Inder, Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "700"],
});
const inder = Inder({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inder",
  weight: "400",
});

export const metadata: Metadata = {
  title: "SleepSpot :: Find a place to sleep",
  description: "Find a place to sleep with SleepSpot",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inder.variable} ${roboto.variable} ${inter.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
