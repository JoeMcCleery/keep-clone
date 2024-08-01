import type { Metadata } from "next";
import RxDBProvider from "@/components/provider/RxDBProvider";
import MUIThemeProvider from "@/components/provider/MUIThemeProvider";
import Header from "@/components/layout/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@/app/globals.css";
import NavigationDrawer from "@/components/layout/NavigationDrawer";
import NavOpenProvider from "@/components/provider/NavOpenProvider";
import { Box } from "@mui/material";
import HeaderOffset from "@/components/layout/HeaderOffset";
import EditLabelsModalOpenProvider from "@/components/provider/EditLabelsModalOpenProvider";
import EditLabelsModal from "@/components/modal/EditLabelsModal";

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
            <NavOpenProvider>
              <EditLabelsModalOpenProvider>
                <HeaderOffset />
                <Box sx={{ display: "flex" }}>
                  <Header />
                  <NavigationDrawer />
                  <Box
                    component="main"
                    sx={{ flexGrow: 1 }}
                  >
                    {children}
                  </Box>
                  <EditLabelsModal />
                </Box>
              </EditLabelsModalOpenProvider>
            </NavOpenProvider>
          </RxDBProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
