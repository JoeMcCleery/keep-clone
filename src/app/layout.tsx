import type { Metadata } from "next";
import RxDBProvider from "@/rxdb/components/RxDBProvider";
import "@fontsource/roboto/400.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Keep Clone",
  description: "A Google Keep clone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RxDBProvider>{children}</RxDBProvider>
      </body>
    </html>
  );
}
