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
          <p className="text-sm text-gray-500 hover:cursor-pointer hover:underline">
            Ver todos
          </p>
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
                src={`https://image.tmdb.org/t/p/original/${result.author_details.avatar_path}`}
                alt={result.author}
              />
              <div className="">
                <p className="text-lg font-bold">{result.author}</p>
                <p className="text-sm text-gray-500">
                  em {new Date(result.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-blue-700 p-1 text-white">
                {/* <MUIReviewsIcon fontSize="small" /> */}
                <p className="text-sm font-bold">
                  {result.author_details.rating * 10}%
                </p>
              </div>
            </div>
            <div className="flex items-end">
              <div>
                <p className={`text-sm`}>{result.content}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm italic text-gray-500">
          Não existem comentários até o momento.
        </p>
      )}
    </div>
  );
};
