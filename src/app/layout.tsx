// import type { Metadata } from "next";
// import "./globals.css";
// import { Providers } from "./components/Providers";

// export const metadata: Metadata = {
//   title: "Parallax Presentation",
//   description: "Eine interaktive Präsentation mit Parallax-Effekt",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="de">
//       <Providers>
//         <body>{children}</body>
//       </Providers>
//     </html>
//   );
// }
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/Providers";
import { LoginButton } from "@/app/components/LoginButton";

export const metadata: Metadata = {
  title: "Parallax Presentation",
  description: "Eine interaktive Präsentation mit Parallax-Effekt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
