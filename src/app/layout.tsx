import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Awesome Github Insights",
  description: "Profile insights for a Github user",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader />
        {children}

        <div className="text-center text-sm text-gray-500 ">
          Powered ⚡ by{" "}
          <Link
            className="hover:text-gray-400"
            href="https://daxsome.owbird.site"
          >
            DaXSome
          </Link>
        </div>
      </body>

      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-X9J8Y8N8SM" />
      )}
    </html>
  );
}
