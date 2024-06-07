"use client";

import { Card } from "@/components/Card";
import { MediaSkeleton } from "@/components/MediaCarousel/MediaSkeleton";
import { Pagination } from "@/components/Pagination";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { parseGenre } from "@/lib/parseGenre";

const Component = ({
  genre,
  mediaType,
}: {
  genre: number;
  mediaType: "movie" | "tv";
}) => {
  const [page, setPage] = useState(1);
  const {
    data: media,
    isLoading,
    error,
  } = useSWR(
    `/3/discover/${mediaType}?with_genres=${genre}&page=${page}`,
    fetcher,
  );
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages((prev) => media?.total_pages ?? prev);
  }, [media?.total_pages]);

  if (error) {
    return <div>ERROR</div>;
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
              href={`/${mediaType}/${item.id}`}
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
            Sem resultados.
          </span>
        )}
      </div>
      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </Fragment>
  );
};

export default function Genres({
  params: { genre },
}: {
  params: { genre: number };
}) {
  return (
    <div className="container flex flex-col pt-4">
      <Tabs defaultValue="movies">
        <h2 className="mb-2 text-xl font-semibold tracking-tight">
          Gênero: {parseGenre(genre)!.name}
        </h2>
        <TabsList className="grid w-full grid-cols-2 md:w-96">
          <TabsTrigger value="movies">Filmes</TabsTrigger>
          <TabsTrigger value="series">Series</TabsTrigger>
        </TabsList>
        <Separator className="mb-4 mt-3" />
        <TabsContent value="movies">
          <Component genre={genre} mediaType="movie" />
        </TabsContent>
        <TabsContent value="series">
          <Component genre={genre} mediaType="tv" />
        </TabsContent>
      </Tabs>
    </div>
  );
}
