// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "Parallax Presentation",
//   description: "Eine interaktive Präsentation mit Parallax-Effekt",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="de">
//       <body className="antialiased">{children}</body>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallax Presentation",
  description: "Eine interaktive Präsentation mit Parallax-Effekt",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="overflow-hidden">
      <body className="antialiased overflow-hidden touch-pan-y">
        {children}
      </body>
    </html>
  );
}
