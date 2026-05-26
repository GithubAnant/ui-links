import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.anants.studio"),
  title: {
    default: "ui.anants.studio",
    template: "%s | ui.anants.studio",
  },
  description:
    "A clean, searchable shelf of UI inspiration, systems, typography, motion, and design resources curated by Anant.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ui.anants.studio",
    description:
      "A clean, searchable shelf of UI inspiration, systems, typography, motion, and design resources curated by Anant.",
    url: "https://ui.anants.studio",
    siteName: "ui.anants.studio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ui.anants.studio",
    description:
      "A clean, searchable shelf of UI inspiration, systems, typography, motion, and design resources curated by Anant.",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#050505",
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
