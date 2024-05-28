import "@/styles/globals.css";
import "@mantine/core/styles.layer.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import type { AppProps } from "next/app";
import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { theme } from "@/theme";
import Layout from "@/layout";
import { Notifications } from "@mantine/notifications";

const colorSchemeManager = localStorageColorSchemeManager({
  key: "my-app-color-scheme",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="auto"
    >
      <Notifications />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MantineProvider>
  );
}
