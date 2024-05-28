import { Card } from "@/components/Card";
import { Loader } from "@/components/Loader";
import { fetcher } from "@/utils/fetcher";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { Container, Grid, Pagination, Text } from "@mantine/core";

export default function Movie() {
  const {
    query: { name },
    push,
  } = useRouter();
  const [page, setPage] = useState(1);

  const {
    data: search,
    error: errorMovie,
  }: {
    data: { results: Movie[] | Serie[]; total_pages: number };
    error?: AxiosError;
  } = useSWR(`/3/search/multi?query=${name}&page=${page}`, fetcher);

  if (!search) return <Loader />;
  if (errorMovie) return <div>error</div>;
  console.log(search);

  return (
    <Container className="mt-6 flex flex-col space-y-6" size="xl">
      <Text className="text-xl font-semibold">
        {search.results.length
          ? `Resultados para: ${name}`
          : "Nenhum resultado encontrado"}
      </Text>
      <Grid>
        {search.results.map((item, index) => (
          <Grid.Col
            key={index}
            span={{ base: 6, xs: 4, sm: 3, md: 2 }}
            onClick={() => push(`/${item.media_type}/${item.id}`)}
          >
            <Card
              image={item.poster_path}
              label={
                (item as Movie).release_date?.substring(0, 4) ??
                (item as Serie).first_air_date?.substring(0, 4)
              }
              title={(item as Movie).title ?? (item as Serie).name}
              onClick={() => push("/")}
            />
          </Grid.Col>
        ))}
      </Grid>
      {search.results.length > 1 && (
        <Pagination
          className="self-center"
          value={page}
          total={search.total_pages}
          onChange={setPage}
        />
      )}
    </Container>
  );
}
