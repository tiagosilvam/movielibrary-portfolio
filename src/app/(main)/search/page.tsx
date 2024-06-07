"use client";

import { Card } from "@/components/Card";
import { Pagination } from "@/components/Pagination";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { MediaSkeleton } from "@/components/MediaCarousel/MediaSkeleton";

const Component = ({
  keyword,
  type,
}: {
  keyword: string;
  type: "tv" | "movie";
}) => {
  const [page, setPage] = useState(1);
  const {
    data: media,
    isLoading,
    error,
  } = useSWR(`/3/search/${type}?query=${keyword}&page=${page}`, fetcher);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages((prev) => media?.total_pages ?? prev);
  }, [media?.total_pages]);

  if (error) {
    return <span>Error</span>;
  }

  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4 text-white md:grid-cols-5">
        {isLoading ? (
          <MediaSkeleton />
        ) : media.results.length > 0 ? (
          media.results.map((item: Movie | TV) => (
            <Link
              className="justify-self-center"
              key={item.id}
              href={`/${type}/${item.id}`}
            >
              <Card
                image={item.poster_path}
                title={(item as Movie).title ?? (item as TV).name}
                label={
                  (item as Movie).release_date ?? (item as TV).first_air_date
                }
              />
            </Link>
          ))
        ) : (
          <span className="col-span-3 text-sm italic text-muted-foreground">
            Sem resultados para &apos;{keyword}&apos; em{" "}
            {type === "tv" ? "series" : "filmes"}.
          </span>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Fragment>
  );
};

export default function Search({
  searchParams: { keyword },
}: {
  searchParams: { keyword: string };
}) {
  return (
    <div className="container flex flex-col pt-4">
      <Tabs defaultValue="movies">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          Resultados para: &apos;{keyword}&apos;
        </h2>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="movies">Filmes</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
        </TabsList>
        <Separator className="mb-4 mt-3" />
        <TabsContent value="movies">
          <Component keyword={keyword} type="movie" />
        </TabsContent>
        <TabsContent value="series">
          <Component keyword={keyword} type="tv" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
