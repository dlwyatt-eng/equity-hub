import type { Metadata } from "next";
import { Atkinson_Hyperlegible_Next, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const atkinson = Atkinson_Hyperlegible_Next({
  variable: "--font-atkinson",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dlwyatt-eng.github.io/equity-hub/"),
  title: "Walnut Road Equity Learning & Action Hub",
  description:
    "A public K–12 Equity Learning & Action Hub with grade-band guidance, teacher preparation, projected lessons, printables, and linked public sources.",
  openGraph: {
    title: "Walnut Road Equity Learning & Action",
    description: "Public K–12 hub · grade guidance · projection · printables",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Walnut Road students learning, questioning, and taking action together." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walnut Road Equity Learning & Action",
    description: "Public K–12 hub · grade guidance · projection · printables",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${atkinson.variable} ${geistMono.variable} ${lora.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
