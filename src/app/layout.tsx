import type { Metadata } from "next";
import RxDBProvider from "@/components/provider/RxDBProvider";
import MUIThemeProvider from "@/components/provider/MUIThemeProvider";
import Header from "@/components/layout/Header";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NavigationDrawer from "@/components/layout/NavigationDrawer";
import { Box } from "@mui/material";
import HeaderOffset from "@/components/layout/HeaderOffset";
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
            <HeaderOffset />
            <Box sx={{ display: "flex" }}>
              <Header />
              <NavigationDrawer />
              <Box
                component="main"
                flexGrow={1}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={3}
                  p={3}
                  justifyContent="center"
                  alignItems="center"
                >
                  {children}
                </Box>
              </Box>
              <EditLabelsModal />
            </Box>
          </RxDBProvider>
        </MUIThemeProvider>
      </body>
    </html>
  );
}
