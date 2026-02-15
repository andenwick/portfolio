import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Anden Wickstrand",
  description:
    "19-year-old computer engineering student who builds software for real clients. Based in Utah.",
  openGraph: {
    title: "Anden Wickstrand",
    description:
      "19-year-old computer engineering student who builds software for real clients.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-[family-name:var(--font-inter)]">{children}</body>
    </html>
  );
}
