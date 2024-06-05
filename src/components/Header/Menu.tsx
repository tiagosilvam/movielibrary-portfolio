"use client";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { AxiosError } from "axios";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { Loader } from "../Loader";

export function NavigationMenuDemo() {
  const {
    data: media,
    isLoading,
    error,
  }: {
    data: Genres;
    isLoading: boolean;
    error?: AxiosError;
  } = useSWR(`/3/genre/movie/list`, fetcher);

  if (error) {
    return <div>error</div>;
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Gêneros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid max-h-[600px] w-[400px] gap-1 overflow-y-auto p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {isLoading ? (
                <Loader type="spinner" />
              ) : (
                media.genres.map((genre) => (
                  <ListItem
                    key={genre.id}
                    title={genre.name}
                    href={`/genres/${genre.id}`}
                  />
                ))
              )}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

ListItem.displayName = "ListItem";
