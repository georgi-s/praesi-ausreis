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
      <body style={{ width: "100vw", height: "100vh", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}
