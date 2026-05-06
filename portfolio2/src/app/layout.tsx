import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
  description:
    "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
  keywords: [
    "Vaibhav Dhanorkar",
    "Technical Program Manager",
    "Portfolio",
    "CJI",
    "Velox",
    "IEEE Senior Member",
  ],
  authors: [{ name: "Vaibhav Dhanorkar" }],
  openGraph: {
    title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
    description:
      "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
    type: "website",
    url: "https://vaibhavdhanorkar.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
    description:
      "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="noise bg-bg text-primary font-sans antialiased">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
