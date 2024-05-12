import { Movie } from "@/components/Movies";
import { fetcher } from "@/utils/fetcher";
import { Box } from "@mantine/core";
import { AxiosError } from "axios";
import useSWR from "swr";

export default function Home() {
  const {
    data: popular,
    isLoading,
    error,
  }: {
    data: { results: Movie[] };
    isLoading: boolean;
    error?: AxiosError;
  } = useSWR("/3/movie/popular", fetcher);
  const limit = 20;

  if (error) return <p>{error.code}</p>;
  console.log(popular)

  return (
    <Box className="space-y-10 py-8">
      <Movie
        popular={popular}
        title="Popular"
        loading={isLoading}
        limit={limit}
      />
      <Movie
        popular={popular}
        title="Tendências"
        loading={isLoading}
        limit={20}
      />
      <Movie
        popular={popular}
        title="Gratuito"
        loading={isLoading}
        limit={20}
      />
    </Box>
  );
}
