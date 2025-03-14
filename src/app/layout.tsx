import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"
 
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Repolens",
  description: "Repolens is a website that helps you question or analyse your repositories",
  icons: [{ rel: "icon", url: "/git.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
