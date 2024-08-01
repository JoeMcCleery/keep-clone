import type { Metadata } from "next";
import RxDBProvider from "@/components/provider/RxDBProvider";
import MUIThemeProvider from "@/components/provider/MUIThemeProvider";
import Header from "@/components/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/app/globals.css";

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
        <MUIThemeProvider>
          <RxDBProvider>
            <Header />
            {children}
          </RxDBProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
