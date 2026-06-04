import type { Metadata } from "next";
import "./globals.css";
import { Navbar }       from "@/components/layout/Navbar";
import { Footer }       from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { getEnv } from "@/lib/env";
import { getProfile } from "@/lib/sanity/queries";

const env = getEnv();

export const metadata: Metadata = {
  title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
  description:
    "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
  keywords: ["Vaibhav Dhanorkar","Technical Program Manager","Portfolio","CJI","Velox","IEEE Senior Member"],
  authors: [{ name: "Vaibhav Dhanorkar" }],
  openGraph: {
    title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
    description: "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
    type: "website",
    url: env.NEXT_PUBLIC_SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaibhav Dhanorkar — Technical Program Manager | Builder",
    description: "Portfolio of Vaibhav Dhanorkar — Technical Program Manager, IEEE Senior Member, and builder of CJI and Velox.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();

  return (
    <html lang="en">
      <body className="grain bg-ivory text-ink font-sans antialiased">
        <CustomCursor />
        <Navbar email={profile.email} />
        <main>{children}</main>
        <Footer profile={profile} />
      </body>
    </html>
  );
}
