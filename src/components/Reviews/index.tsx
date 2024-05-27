import { fetcher } from "@/utils/fetcher";
import { Box, Paper, Skeleton, Spoiler, Text } from "@mantine/core";
import { Reviews as MUIReviewsIcon } from "@mui/icons-material";
import { AxiosError } from "axios";
import useSWR from "swr";
import { LoadingImage } from "@/components/Image";

export const Reviews = ({
  mediaId,
  type,
}: {
  mediaId?: string | string[];
  type: "movie" | "tv";
}) => {
  const {
    data: reviews,
    error: errorReviews,
  }: {
    data: Reviews;
    error?: AxiosError;
  } = useSWR(mediaId && `/3/${type}/${mediaId}/reviews`, fetcher);

  if (!reviews) return <Skeleton className="h-32" />;
  if (errorReviews) return <div>error</div>;

  return (
    <Box className="flex flex-col space-y-2">
      <Box className="flex items-center space-x-1">
        <Text className="text-lg font-bold">Comentários</Text>
        <Text>({reviews.results.length})</Text>
        {reviews.results.length > 2 && (
          <Text className="pl-1 text-sm text-gray-500 hover:cursor-pointer hover:underline">
            Ver todos
          </Text>
        )}
      </Box>
      {reviews.results.length > 0 ? (
        reviews.results.slice(0, 2).map((result, index) => (
          <Paper
            className="flex flex-col space-y-5 rounded-lg p-8 shadow-sm"
            key={index}
          >
            <Box className="flex items-center space-x-3">
              <LoadingImage
                className="h-11 w-11 rounded-full"
                src={`https://image.tmdb.org/t/p/original/${result.author_details.avatar_path}`}
                alt={result.author}
              />
              <Box className="">
                <Text className="text-lg font-bold">{result.author}</Text>
                <Text className="text-sm text-gray-500">
                  em {new Date(result.created_at).toLocaleDateString()}
                </Text>
              </Box>
              <Box className="flex items-center space-x-1 rounded-md bg-blue-700 p-1 text-white">
                <MUIReviewsIcon fontSize="small" />
                <Text className="text-sm font-bold">
                  {result.author_details.rating * 10}%
                </Text>
              </Box>
            </Box>
            <Box className="flex items-end">
              <Spoiler
                hideLabel="Ver menos"
                showLabel="Ver mais"
                maxHeight={40}
              >
                <Text className={`text-sm`}>{result.content}</Text>
              </Spoiler>
            </Box>
          </Paper>
        ))
      ) : (
        <Text className="text-sm italic text-gray-500">
          Não existem comentários até o momento.
        </Text>
      )}
    </Box>
  );
};
