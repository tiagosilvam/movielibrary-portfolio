import { Carousel } from "@/components/Caousel";
import { LoadingImage } from "@/components/Image";
import { Loader } from "@/components/Loader";
import { Reviews } from "@/components/Reviews";
import { fetcher } from "@/utils/fetcher";
import {
  Box,
  Container,
  Grid,
  RingProgress,
  Text,
  Tooltip,
} from "@mantine/core";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";

export default function Movie() {
  const {
    query: { id },
  } = useRouter();
  const {
    data: movie,
    error: errorMovie,
  }: {
    data: SerieDetails;
    error?: AxiosError;
  } = useSWR(id && `/3/tv/${id}`, fetcher);

  const {
    data: credits,
    error: errorCredits,
  }: {
    data: Credits;
    error?: AxiosError;
  } = useSWR(id && `/3/tv/${id}/credits?language=en-US`, fetcher);

  const {
    data: releases,
    error: errorReleases,
  }: {
    data: ReleaseDate;
    error?: AxiosError;
  } = useSWR(id && `/3/tv/${id}/content_ratings`, fetcher);

  const { data: recommendations, error: errorRecommendations } = useSWR(
    id && `/3/tv/${id}/recommendations`,
    fetcher,
  );

  const {
    data: providers,
    error: errorProviders,
  }: { data: Provider; error?: AxiosError } = useSWR(
    id && `/3/tv/${id}/watch/providers`,
    fetcher,
  );

  if (!movie || !credits || !releases || !recommendations || !providers)
    return <Loader />;
  if (
    errorMovie ||
    errorCredits ||
    errorReleases ||
    errorRecommendations ||
    errorProviders
  )
    return <div>error</div>;

  return (
    <Fragment>
      <Box className="relative">
        <Container className="min-h-[calc(100vh-60px)]" size="xl">
          <Box className="absolute left-0 top-0 -z-10 h-full bg-gradient-to-r from-black via-zinc-800 to-black">
            <LoadingImage
              className="h-full w-screen opacity-5"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={`${movie.id}`}
            />
          </Box>
          <Grid className="px-4 py-16" gutter="xl">
            <Grid.Col
              className="relative flex items-center max-lg:justify-center"
              span={{ sm: 12, md: 3 }}
            >
              <LoadingImage
                className="h-[435px] w-80 rounded-lg"
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={`${movie.id}`}
              />
            </Grid.Col>
            <Grid.Col className="space-y-4 text-white" span={{ sm: 12, md: 9 }}>
              <Box className="space-y-2">
                <Text className="text-4xl font-bold">
                  {movie.original_name} ({movie.first_air_date.substring(0, 4)})
                </Text>
                <Box className="flex items-center space-x-1">
                  <Box className="mr-1 min-h-6 min-w-6 rounded-md bg-green-600 p-1">
                    <Text className="text-center text-xs font-bold">
                      {
                        releases.results.filter(
                          (item) => item.iso_3166_1 === "BR",
                        )[0]?.rating
                      }
                    </Text>
                  </Box>
                  <Text className="text-xs">
                    {new Date(movie.first_air_date).toLocaleDateString()} -{" "}
                  </Text>
                  {movie.genres.map((genre, index) => (
                    <Text className="text-xs" key={index}>
                      {genre.name}
                      {index !== movie.genres.length - 1 && ","}
                    </Text>
                  ))}
                  <Text className="text-xs">
                    {" "}
                    - {movie.number_of_episodes} episódios
                  </Text>
                </Box>
              </Box>
              <Box className="flex items-center space-x-2">
                <RingProgress
                  size={60}
                  thickness={6}
                  roundCaps
                  sections={[
                    {
                      value: Math.floor((movie.vote_average / 10) * 100),
                      color: "blue",
                    },
                  ]}
                  label={
                    <Text className="text-center text-xs font-bold">
                      {Math.floor((movie.vote_average / 10) * 100)}%
                    </Text>
                  }
                />
                <Text className="font-bold"> Classificação geral</Text>
              </Box>
              <Box className="space-y-2">
                <Text className="text-xl font-bold">Resumo</Text>

                {movie.overview === "" ? (
                  <Text className="text-gray-500">
                    Este filme ainda não possui um resumo em português.
                  </Text>
                ) : (
                  <Text>{movie.overview}</Text>
                )}
              </Box>
              <Box className="flex space-x-1">
                <Text className="font-bold">Última temporada:</Text>
                <Text>Temporada {movie.number_of_seasons}</Text>
              </Box>
              {providers.results.BR?.rent && (
                <Box className="space-y-2">
                  <Text>Disponivel nas plataformas:</Text>
                  <Box className="flex space-x-2">
                    {providers.results.BR.rent.map((provider, index) => (
                      <Tooltip
                        key={index}
                        label={provider.provider_name}
                        position="bottom"
                      >
                        <LoadingImage
                          className="h-8 w-8 rounded-md"
                          src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                          alt={provider.provider_name}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid.Col>
            {movie.production_companies.length > 0 && (
              <Grid.Col className="flex space-x-2" span={12}>
                <Text className="text-white">Produzido por:</Text>
                {movie.production_companies.map((item, index) =>
                  item.logo_path ? (
                    <Tooltip
                      className="flex flex-col items-center justify-center"
                      key={index}
                      label={item.name}
                      position="bottom"
                    >
                      <Box className="rounded-md bg-gray-300 p-1">
                        <LoadingImage
                          className="h-6 min-w-6"
                          src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                          alt={item.name}
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    "A"
                  ),
                )}
              </Grid.Col>
            )}
          </Grid>
        </Container>
      </Box>
      <Container className="mt-6 space-y-6" size="xl">
        <Carousel title="Elenco" media={credits.cast} type="person" />
        <Reviews mediaId={id} type="tv" />
        <Carousel
          title={`Recomendações baseadas em ${movie.original_name}`}
          type="movie"
          media={recommendations.results}
        />
      </Container>
    </Fragment>
  );
}
