import type { Metadata } from "next";
import "@arthav/open-loading/styles.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "open-loading Next.js example",
  description: "App Router loading-state examples with @arthav/open-loading."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
