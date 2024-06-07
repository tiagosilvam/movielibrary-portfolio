import { fetcher } from "@/lib/fetcher";
import { AxiosError } from "axios";
import useSWR from "swr";
import { LoadingImage } from "@/components/LoadingImage";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const Reviews = ({
  mediaId,
  type,
}: {
  mediaId: number;
  type: "movie" | "tv";
}) => {
  const {
    data: reviews,
    error: errorReviews,
  }: {
    data: Reviews;
    error?: AxiosError;
  } = useSWR(`/3/${type}/${mediaId}/reviews`, fetcher);

  if (!reviews) return <Skeleton className="h-32" />;
  if (errorReviews) return <div>error</div>;

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-semibold leading-none tracking-tight">
        Comentários ({reviews.results.length})
      </h2>
      <Separator className="mb-4 mt-3" />
      <div>
        {reviews.results.length > 2 && (
          <span className="text-sm text-gray-500 hover:cursor-pointer hover:underline">
            Ver todos
          </span>
        )}
      </div>
      {reviews.results.length > 0 ? (
        reviews.results.slice(0, 2).map((result, index) => (
          <div
            className="flex flex-col space-y-5 rounded-lg shadow-sm"
            key={index}
          >
            <div className="flex items-center space-x-3">
              <LoadingImage
                className="h-11 w-11 rounded-full"
                src={result.author_details.avatar_path}
                alt={result.author}
              />
              <div className="flex flex-col">
                <span className="text-lg font-bold">{result.author}</span>
                <span className="text-sm text-gray-500">
                  em {new Date(result.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-blue-700 p-1 text-white">
                <span className="text-sm font-bold">
                  {result.author_details.rating * 10}%
                </span>
              </div>
            </div>
            <div className="flex items-end">
              <span className="text-sm">{result.content}</span>
            </div>
          </div>
        ))
      ) : (
        <span className="text-sm italic text-gray-500">
          Não existem comentários até o momento.
        </span>
      )}
    </div>
  );
};
