import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "La Casa dei Limoni",
  description: "The Italian Summer in the American Mind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
