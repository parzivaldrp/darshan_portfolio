import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





export const metadata: Metadata = {
  title: "Darshan Panchal — Junior Full Stack Developer (React, Next.js, AWS)",
  description:
    "Junior full stack developer based in Melbourne, Australia. I build modern web apps with React, Next.js, TypeScript, and AWS. Computer Science graduate. Open to entry-level roles.",
  keywords: [
    "Darshan Panchal",
    "Junior Full Stack Developer",
    "React Developer Melbourne",
    "Next.js Developer Australia",
    "TypeScript",
    "AWS",
    "Supabase",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Darshan Panchal" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Darshan Panchal — Junior Full Stack Developer",
    description:
      "Building modern web apps with React, Next.js, TypeScript, and AWS. Based in Melbourne. Open to junior / entry-level roles.",
    type: "website",
    locale: "en_AU",
    // TODO: replace /favicon.ico with a proper 1200x630 PNG once og-image.png
    // is added to /public. Until then, links shared on LinkedIn/Slack will
    // show a tiny favicon — better than nothing but not great.
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Darshan Panchal — Junior Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Darshan Panchal — Junior Full Stack Developer",
    description:
      "Building modern web apps with React, Next.js, TypeScript, and AWS. Open to junior roles.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
        <ToastContainer />
        <Footer />
      </body>
    </html>
  );
}
