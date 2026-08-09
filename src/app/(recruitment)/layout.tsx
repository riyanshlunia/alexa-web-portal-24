import type { Metadata } from "next";
import { Nunito as FontSans, Montserrat, Montserrat_Alternates } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-montserrat-alternates",
});
export const metadata: Metadata = {
  title: "Welcome | ADS!",
  description: "Created with ♥️ by the ADS team.",
  icons: {
    icon: "/icon2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen h-full bg-black font-sans antialiased",
          fontSans.variable,
          montserrat.variable,
          montserratAlternates.variable
        )}
      >
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}