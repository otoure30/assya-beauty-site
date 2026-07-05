import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Assya Beauty Cosmebio | Maison de Cosmétique Botanique Africaine",
  description:
    "Soins naturels premium pour la peau et les cheveux, formulés avec les trésors botaniques de Guinée.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
