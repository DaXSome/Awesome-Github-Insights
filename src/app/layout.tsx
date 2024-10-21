import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

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
      <head>
        <link
          rel="stylesheet"
          href="https://owbird.site/api/cdn/css/credit.css"
        />
      </head>
      <body className={inter.className}>
        <NextTopLoader />
        {children}
      </body>

      {process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId="G-X9J8Y8N8SM" />
      )}
    </html>
  );
}
