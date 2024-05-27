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
import useSWR from "swr";
import { VideoCard } from "@/components/VideoCard";
import { Carousel } from "@/components/Caousel";

export default function Movie() {
  const {
    query: { id },
    push,
  } = useRouter();

  const {
    data: movie,
    error: errorMovie,
  }: {
    data: MovieDetails;
    error?: AxiosError;
  } = useSWR(id && `/3/movie/${id}`, fetcher);

  const {
    data: credits,
    error: errorCredits,
  }: {
    data: Credits;
    error?: AxiosError;
  } = useSWR(id && `/3/movie/${id}/credits?language=en-US`, fetcher);

  const {
    data: releases,
    error: errorReleases,
  }: {
    data: ReleaseDate;
    error?: AxiosError;
  } = useSWR(id && `/3/movie/${id}/release_dates`, fetcher);

  const { data: recommendations, error: errorRecommendations } = useSWR(
    id && `/3/movie/${id}/recommendations`,
    fetcher,
  );

  const {
    data: providers,
    error: errorProviders,
  }: { data: Provider; error?: AxiosError } = useSWR(
    id && `/3/movie/${id}/watch/providers`,
    fetcher,
  );

  const {
    data: videos,
    error: errorVideos,
  }: { data: { results: Video[] }; error?: AxiosError } = useSWR(
    id && `/3/movie/${id}/videos`,
    fetcher,
  );

  if (
    !movie ||
    !credits ||
    !releases ||
    !recommendations ||
    !providers ||
    !videos
  )
    return <Loader />;
  if (
    errorProviders ||
    errorReleases ||
    errorCredits ||
    errorMovie ||
    errorRecommendations ||
    errorVideos
  )
    return <div>error</div>;

  return (
    <Box>
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
                alt="eae"
              />
            </Grid.Col>
            <Grid.Col className="space-y-4 text-white" span={{ sm: 12, md: 9 }}>
              <Box className="space-y-2">
                <Text className="text-4xl font-bold">
                  {movie.title} ({movie.release_date.substring(0, 4)})
                </Text>
                <Box className="flex items-center space-x-1">
                  <Box className="mr-1 min-h-6 min-w-6 rounded-md bg-green-600 p-1">
                    <Text className="text-center text-xs font-bold">
                      {releases.results.filter(
                        (item) => item.iso_3166_1 === "BR",
                      )[0]?.release_dates[0]?.certification === "" ?? "N/A"}
                    </Text>
                  </Box>
                  <Text className="text-xs">
                    {new Date(movie.release_date).toLocaleDateString()} -{" "}
                  </Text>
                  {movie.genres.map((genre, index) => (
                    <Text className="text-xs" key={index}>
                      {genre.name}
                      {index !== movie.genres.length - 1 && ","}
                    </Text>
                  ))}
                  <Text className="text-xs">
                    {" "}
                    - {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}min
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
              {movie.belongs_to_collection && (
                <Box className="flex space-x-1">
                  <Text className="font-bold">Trilogia:</Text>
                  <Text
                    className="cursor-pointer hover:underline"
                    onClick={() =>
                      push(`/3/collection/${movie.belongs_to_collection.id}`)
                    }
                  >
                    {movie.belongs_to_collection.name}
                  </Text>
                </Box>
              )}
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
                        <Box>
                          <LoadingImage
                            className="h-8 w-8 rounded-md"
                            src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                            alt={provider.provider_name}
                          />
                        </Box>
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              )}
            </Grid.Col>
            {movie.production_companies.length > 0 && (
              <Grid.Col className="flex flex-col space-y-1" span={12}>
                <Text className="text-white">Produzido por:</Text>
                <Box className="flex space-x-2">
                  {movie.production_companies.map(
                    (item, index) =>
                      item.logo_path && (
                        <Tooltip
                          className="flex flex-col items-center justify-center"
                          key={index}
                          label={item.name}
                          position="bottom"
                        >
                          <Box className="rounded-md bg-gray-300 p-1">
                            <LoadingImage
                              className="h-6 w-auto min-w-6"
                              src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                              alt={item.name}
                            />
                          </Box>
                        </Tooltip>
                      ),
                  )}
                </Box>
              </Grid.Col>
            )}
          </Grid>
        </Container>
      </Box>
      <Container className="mt-6 space-y-6" size="xl">
        <Carousel title="Elenco" media={credits.cast} type="person" />
        <VideoCard videos={videos.results} />
        <Reviews mediaId={id} type="movie" />
        <Carousel
          title={`Recomendações baseadas em ${movie.title}`}
          type="movie"
          media={recommendations.results}
        />
      </Container>
    </Box>
  );
}
