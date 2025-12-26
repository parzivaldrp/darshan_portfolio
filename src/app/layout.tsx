import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





export const metadata: Metadata = {
  title: "Darshan Panchal Portfolio",
  description: "welcome to my portfolio",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Darshan Panchal Portfolio",
    description: "welcome to my portfolio",
    images: "/favicon.ico",
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
