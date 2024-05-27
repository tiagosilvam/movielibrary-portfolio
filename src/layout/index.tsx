import { AppShell } from "@mantine/core";
import { Fragment, ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Head from "next/head";

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
        <AppShell header={{ height: 60 }} footer={{ height: 60 }}>
          <AppShell.Header>
            <Navbar />
          </AppShell.Header>
          <AppShell.Main>{children}</AppShell.Main>
          <Footer />
        </AppShell>
      </main>
    </Fragment>
  );
}
