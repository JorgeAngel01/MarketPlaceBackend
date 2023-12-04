import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Market Place",
  description: "Prgramacion Movil",
};

export default function RootLayout({ children }) {
  const className = `h-screen w-full overflow-hiden bg-orange-200 justify-center xl:pb-24 ${inter.className}`

  return (
    <html lang="en">
      <body className={className}>{children}</body>
    </html>
  );
}
