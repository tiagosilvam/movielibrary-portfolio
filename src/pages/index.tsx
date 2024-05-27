import { Carousel } from "@/components/Caousel";
import { Loader } from "@/components/Loader";
import { fetcher } from "@/utils/fetcher";
import { Container } from "@mantine/core";
import useSWR from "swr";

export default function Home() {
  const {
    data: moviePopular,
    isLoading: isLoadingMoviePopular,
    error: errorMoviePopular,
  } = useSWR(`/3/movie/popular`, fetcher);
  const {
    data: movieTop,
    isLoading: isLoadingMovieTop,
    error: errorMovieTop,
  } = useSWR(`/3/movie/top_rated`, fetcher);
  const {
    data: seriePopular,
    isLoading: isLoadingSeriePopular,
    error: errorSeriePopular,
  } = useSWR(`/3/tv/popular`, fetcher);

  if (isLoadingMoviePopular || isLoadingMovieTop || isLoadingSeriePopular)
    return <Loader />;
  if (errorMoviePopular || errorMovieTop || errorSeriePopular)
    return <div>error</div>;

  return (
    <Container size="xl" className="mt-6 flex flex-col space-y-6">
      <Carousel
        title="Filmes populares"
        media={moviePopular.results}
        type="movie"
      />
      <Carousel title="Mais elogiados" media={movieTop.results} type="movie" />
      <Carousel
        title="Series populares"
        media={seriePopular.results}
        type="tv"
      />
    </Container>
  );
}
