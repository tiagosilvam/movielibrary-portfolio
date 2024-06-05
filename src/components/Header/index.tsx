"use client";

import { Film, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ToggleTheme/inde";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NavigationMenuDemo } from "./Menu";

export const Header = () => {
  const { push } = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link
          href="/"
          className="mr-4 flex items-center space-x-3 max-md:hidden"
        >
          <Film />
          <h2 className="text-xl font-bold">TMDB</h2>
        </Link>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav>
            <NavigationMenuDemo />
          </nav>
          <div className="relative w-full md:w-1/4">
            <Input
              className="touch-none pl-10"
              type="text"
              placeholder="Pesquisar"
              onKeyDown={({ key, currentTarget: { value } }) => {
                if (key === "Enter") {
                  push(`/search?keyword=${value}`);
                }
              }}
            />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <nav className="flex items-center">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
