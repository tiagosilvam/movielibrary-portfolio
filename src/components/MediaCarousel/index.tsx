"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/Card";
import { Fragment } from "react";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";
import { Separator } from "@/components/ui/separator";
import { MediaSkeleton } from "@/components/MediaCarousel/MediaSkeleton";
import { useRouter } from "next/navigation";

const getMediaArray = (
  data: Media | Credits,
  type?: "movie" | "tv" | "person",
) => {
  if (type === "person") {
    return (data as Credits).cast;
  }
  return (data as Media).results;
};

export const CarouselComponent = ({
  url,
  type,
}: {
  url: string;
  type?: "movie" | "tv" | "person";
}) => {
  const { data: media, isLoading, error } = useSWR(url, fetcher);
  const { push } = useRouter();
  if (isLoading) {
    return (
      <div className="mx-4 flex space-x-4 overflow-hidden">
        <MediaSkeleton />
      </div>
    );
  } else if (error) {
    return <span className="text-xs italic text-muted">ERROR</span>;
  }

  return (
    <Fragment>
      {getMediaArray(media, type).length > 0 ? (
        <Carousel
          className="mx-4"
          opts={{
            align: "start",
            dragFree: true,
          }}
        >
          <CarouselContent>
            {getMediaArray(media, type).map((item: TV | Movie | Person) => (
              <CarouselItem key={item.id} className="basis-44">
                <Card
                  image={
                    (item as Movie | TV).poster_path ??
                    (item as Person).profile_path
                  }
                  title={(item as Movie).title ?? (item as TV | Person).name}
                  label={
                    (item as Movie).release_date?.substring(0, 4) ??
                    (item as TV).first_air_date?.substring(0, 4) ??
                    (item as Person).character
                  }
                  onClick={() => {
                    if (type !== "person") {
                      push(
                        `/${type ?? (item as Movie | TV).media_type}/${item.id}`,
                      );
                    }
                  }}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="animate-pulse" />
          <CarouselNext className="animate-pulse" />
        </Carousel>
      ) : (
        <span className="text-sm italic text-muted-foreground">
          Não existem informações serem exibidas.
        </span>
      )}
    </Fragment>
  );
};

export const MediaCarousel = ({
  title,
  type,
  url,
}: {
  title?: string;
  type?: "movie" | "tv" | "person";
  url: string;
}) => {
  return (
    <div className="h-auto">
      <h2 className="text-xl font-semibold leading-none tracking-tight">
        {title}
      </h2>
      <Separator className="mb-4 mt-3" />
      <CarouselComponent url={url} type={type} />
    </div>
  );
};
