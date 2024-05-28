import { AppShell } from "@mantine/core";
import { Fragment, ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Loader } from "@/components/Loader";

const DynamicAppShell = dynamic(
  () => import("@mantine/core").then((component) => component.AppShell),
  {
    loading: () => <Loader />,
    ssr: false,
  },
);

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <Fragment>
      <Head>
        <title>TMDB</title>
      </Head>
      <main>
        <DynamicAppShell header={{ height: 60 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Navbar />
          </AppShell.Header>
          <AppShell.Main>{children}</AppShell.Main>
          <Footer />
        </DynamicAppShell>
      </main>
    </Fragment>
  );
}
