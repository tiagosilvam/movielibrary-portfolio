"use client";

import { Loader } from "@/components/Loader";
import { LoadingImage } from "@/components/LoadingImage";
import { MediaCarousel } from "@/components/MediaCarousel";
import { MediaRating } from "@/components/MediaRating";
import { Reviews } from "@/components/Reviews";
import { VideoCard } from "@/components/VideoCard";
import { fetcher } from "@/lib/fetcher";
import { AxiosError } from "axios";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import useSWR from "swr";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

const getRating = (releaseDates: ReleaseDate) => {
  const result = releaseDates.results.filter(
    (item) => item.iso_3166_1 === "BR",
  )[0];

  return result?.rating ?? result?.release_dates[0]?.certification;
};

const getMediaLength = (media: Movie & TV, type: "movie" | "tv") => {
  if (media.number_of_seasons || media.runtime) {
    if (type === "tv") {
      return <Fragment>{media.number_of_seasons} temporadas</Fragment>;
    }
    return (
      <Fragment>
        {Math.floor(media.runtime / 60)}h {media.runtime % 60}min
      </Fragment>
    );
  }
  return "N/A";
};

export default function Media({
  params: { id, mediaType },
}: {
  params: { id: string; mediaType: "movie" | "tv" };
}) {
  const {
    data: media,
    isLoading: isLoadingMedia,
    error: errorMedia,
  }: { data: TV & Movie; isLoading: boolean; error?: AxiosError } = useSWR(
    `/3/${mediaType}/${id}`,
    fetcher,
  );

  const {
    data: releaseDates,
    isLoading: isLoadingReleaseDates,
    error: errorReleaseDates,
  }: { data: ReleaseDates; isLoading: boolean; error?: AxiosError } = useSWR(
    `/3/${mediaType}/${id}/${
      mediaType === "movie" ? "release_dates" : "content_ratings"
    }`,
    fetcher,
  );

  const {
    data: providers,
    isLoading: isLoadingProviders,
    error: errorProviders,
  }: { data: Providers; isLoading: boolean; error?: AxiosError } = useSWR(
    `/3/${mediaType}/${id}/watch/providers`,
    fetcher,
  );

  const {
    data: videos,
    isLoading: isLoadingVideos,
    error: errorVideos,
  }: {
    data: { results: Video[] };
    isLoading: boolean;
    error?: AxiosError;
  } = useSWR(id && `/3/${mediaType}/${id}/videos`, fetcher);

  if (
    isLoadingMedia ||
    isLoadingProviders ||
    isLoadingReleaseDates ||
    isLoadingVideos
  ) {
    return <Loader />;
  } else if (!media) {
    return notFound();
  } else if (errorMedia || errorProviders || errorReleaseDates || errorVideos) {
    return (
      <span>
        Oops, não foi possível carregar as informações da mídia no momento.
      </span>
    );
  }

  return (
    <Fragment>
      <div className="relative">
        <div className="container min-h-[calc(100vh-57px)]">
          <div className="absolute left-0 top-0 -z-10 h-full bg-gradient-to-r from-black via-zinc-800 to-black">
            <LoadingImage
              className="h-full w-screen opacity-5"
              src={media.backdrop_path}
              alt={media.backdrop_path}
              original
            />
          </div>
          <div className="grid grid-cols-12 gap-4 py-8 text-white">
            <LoadingImage
              className="col-span-12 h-[432px] w-72 rounded-lg max-md:justify-self-center md:col-span-3"
              src={media.poster_path}
              alt={media.poster_path}
            />
            <div className="col-span-12 space-y-4 md:col-span-9">
              <div className="space-y-1">
                <div className="space-x-1 text-3xl">
                  <span className="font-medium md:text-4xl">
                    {media.title ?? media.name}
                  </span>
                  <span className="text-muted-foreground">
                    (
                    {media.release_date || media.first_air_date
                      ? new Date(
                          media.release_date ?? media.first_air_date,
                        ).getFullYear()
                      : "N/A"}
                    )
                  </span>
                </div>
                <div className="space-x-1 text-sm">
                  <span>
                    {media.genres.length > 0
                      ? media.genres.map((genre, index) => (
                          <Fragment key={index}>
                            {genre.name}
                            {index !== media.genres.length - 1 && ", "}
                          </Fragment>
                        ))
                      : "N/A"}
                  </span>
                  <span>-</span>
                  <span>{getMediaLength(media, mediaType)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-500" />
                <span className="font-medium">
                  Avaliação geral {Math.floor((media.vote_average / 10) * 100)}%
                </span>
              </div>
              <div className="flex space-x-2">
                <span className="font-medium">Classificação indicativa</span>
                <MediaRating certification={getRating(releaseDates)} />
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-lg font-medium">Resumo</span>
                {media.overview === "" ? (
                  <span className="text-sm italic text-gray-500">
                    Esta mídia ainda não possui um resumo em português.
                  </span>
                ) : (
                  <span>{media.overview}</span>
                )}
              </div>
              {providers.results.BR?.[
                mediaType === "movie" ? "rent" : "flatrate"
              ] && (
                <div className="space-y-2">
                  <span className="font-medium">
                    Disponivel nas plataformas:
                  </span>
                  <div className="flex space-x-2">
                    {providers.results.BR[
                      mediaType === "movie" ? "rent" : "flatrate"
                    ].map((provider, index) => (
                      <Tooltip key={index} delayDuration={100}>
                        <TooltipTrigger>
                          <LoadingImage
                            className="h-8 w-8 rounded-md"
                            src={provider.logo_path}
                            alt={provider.provider_name}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          {provider.provider_name}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="col-span-12 flex flex-col space-y-1">
              {media.production_companies.length > 0 && (
                <Fragment>
                  <span className="text-white">Produzido por:</span>
                  <div className="flex space-x-2">
                    {media.production_companies.map((item, index) => (
                      <Tooltip key={index} delayDuration={100}>
                        <TooltipTrigger>
                          <div className="rounded-md bg-gray-500 p-1">
                            <LoadingImage
                              className="h-6 w-auto min-w-6"
                              src={item.logo_path}
                              alt={item.name}
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>{item.name}</TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4 space-y-8">
        <MediaCarousel
          title="Elenco pricipal"
          url={`/3/${mediaType}/${id}/credits?language=en-US`}
          type="person"
        />
        <VideoCard videos={videos.results} />
        <Reviews mediaId={media.id} type={mediaType} />
        <Tabs defaultValue="similar">
          <h2 className="mb-2 text-xl font-semibold tracking-tight">
            {`Baseados em: ${media.title ?? media.name}`}
          </h2>
          <TabsList className="grid w-full grid-cols-2 md:w-96">
            <TabsTrigger value="similar">Similares</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
          </TabsList>
          <TabsContent value="similar">
            <MediaCarousel
              url={`/3/${mediaType}/${media.id}/similar`}
              type={mediaType}
            />
          </TabsContent>
          <TabsContent value="recommendations">
            <MediaCarousel
              url={`/3/${mediaType}/${media.id}/recommendations`}
              type={mediaType}
            />
          </TabsContent>
        </Tabs>
      </div>
    </Fragment>
  );
}
