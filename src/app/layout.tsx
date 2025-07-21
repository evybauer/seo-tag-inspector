import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TagSnippet - SEO Meta Tag Analyzer",
  description: "Analyze and optimize your website&apos;s SEO meta tags, Open Graph, Twitter Cards, and more. Get actionable recommendations to improve your search rankings and social media presence.",
  keywords: "SEO, meta tags, Open Graph, Twitter Cards, website analysis, search optimization",
  authors: [{ name: "TagSnippet Team" }],
  openGraph: {
    title: "TagSnippet - SEO Meta Tag Analyzer",
    description: "Analyze and optimize your website&apos;s SEO meta tags, Open Graph, Twitter Cards, and more.",
    type: "website",
    url: "https://tagsnippet.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TagSnippet - SEO Meta Tag Analyzer",
    description: "Analyze and optimize your website&apos;s SEO meta tags, Open Graph, Twitter Cards, and more.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
