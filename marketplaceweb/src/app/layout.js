import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Market Place",
  description: "Prgramacion Movil",
};

export default function RootLayout({ children }) {
  const className = `h-screen overflow-hiden ${inter.className}`

  return (
    <html lang="en">
      <body className={className}>{children}</body>
    </html>
  );
}
