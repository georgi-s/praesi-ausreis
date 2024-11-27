import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallax Presentation",
  description: "Eine interaktive Präsentation mit Parallax-Effekt",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="antialiased">{children}</body>
    </html>
  );
}
