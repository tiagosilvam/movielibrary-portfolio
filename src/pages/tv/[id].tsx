import { Carousel } from "@/components/Caousel";
import { LoadingImage } from "@/components/Image";
import { Loader } from "@/components/Loader";
import { MediaRating } from "@/components/MediaRating";
import { Reviews } from "@/components/Reviews";
import { fetcher } from "@/utils/fetcher";
import {
  ActionIcon,
  Box,
  Container,
  CopyButton,
  Grid,
  RingProgress,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Check, ImageNotSupported, IosShare } from "@mui/icons-material";
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
                  <Text className="text-xs">
                    {new Date(movie.first_air_date).toLocaleDateString()} -{" "}
                    {movie.genres.map((genre, index) => (
                      <Fragment key={index}>
                        {genre.name}
                        {index !== movie.genres.length - 1 && ", "}
                      </Fragment>
                    ))}{" "}
                    - {movie.number_of_seasons} temporadas
                  </Text>
                </Box>
              </Box>
              <Box className="flex space-x-2">
                <Text className="font-bold">Classificação indicativa</Text>
                <MediaRating
                  certification={
                    releases.results.filter(
                      (item) => item.iso_3166_1 === "BR",
                    )[0]?.rating
                  }
                />
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
            </Grid.Col>
            {movie.production_companies.length > 0 && (
              <Grid.Col className="flex flex-col space-y-1" span={12}>
                <Text className="text-white">Produzido por:</Text>
                <Box className="flex space-x-2">
                  {movie.production_companies.map((item, index) => (
                    <Tooltip
                      className="flex flex-col items-center justify-center"
                      key={index}
                      label={item.name}
                      position="bottom"
                    >
                      <Box className="rounded-md bg-gray-500 p-1">
                        {item.logo_path ? (
                          <LoadingImage
                            className="h-6 w-auto min-w-6"
                            src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
                            alt={item.name}
                          />
                        ) : (
                          <ImageNotSupported />
                        )}
                      </Box>
                    </Tooltip>
                  ))}
                </Box>
              </Grid.Col>
            )}
            <CopyButton value={window.location.href}>
              {({ copied, copy }) => (
                <Tooltip label="Copiar link">
                  <ActionIcon
                    className="absolute bottom-4 right-4"
                    variant="subtle"
                    color={copied ? "teal" : "blue"}
                    onClick={async () => {
                      await navigator.clipboard
                        .writeText(location.href)
                        .then(() => copy());
                      notifications.show({
                        color: "green",
                        icon: <Check />,
                        message: "Copiado para a área de transferência.",
                      });
                    }}
                    size="lg"
                  >
                    {copied ? <Check /> : <IosShare />}
                  </ActionIcon>
                </Tooltip>
              )}
            </CopyButton>
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
