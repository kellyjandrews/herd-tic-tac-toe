import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "New app",
  description: "A new app built with the factory",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
