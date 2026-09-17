import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SWERAV's Bhashma | Handcrafted Mithai Candles",
  description:
    "Premium handcrafted soy wax mithai candles for festive gifting, weddings, corporate gifting and home decor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
