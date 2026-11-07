import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Herd — Tic-Tac-Toe",
  description: "Play tic-tac-toe with a friend or take on the computer.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
