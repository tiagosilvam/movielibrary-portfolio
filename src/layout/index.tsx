import { AppShell, Container } from "@mantine/core";
import { ReactNode } from "react";
import { useHeadroom } from "@mantine/hooks";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Navbar/footer";

export default function Layout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pinned = useHeadroom({ fixedAt: 65 });

  return (
    <main>
      <AppShell
        header={{ height: 60, collapsed: !pinned }}
        footer={{ height: 60 }}
      >
        <AppShell.Header>
          <Navbar />
        </AppShell.Header>
        <AppShell.Main>
          <Container className="mt-12" size="xl">
            {children}
          </Container>
        </AppShell.Main>
      <Footer />
      </AppShell>
    </main>
  );
}
