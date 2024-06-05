import YouTube from "react-youtube";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

export const VideoCard = ({ videos }: { videos: Video[] }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold leading-none tracking-tight">
        Mídias ({videos.length})
      </h2>
      <Separator className="mb-4 mt-3" />
      <div>
        {videos.length > 0 ? (
          <Carousel>
            <CarouselContent className="min-h-72">
              {videos.map((video) => (
                <CarouselItem key={video.key}>
                  <YouTube
                    className="h-full w-full"
                    videoId={video.key}
                    iframeClassName="w-full h-full rounded-xl"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        ) : (
          <p className="text-sm italic text-gray-500">
            Não existem mídias até o momento.
          </p>
        )}
      </div>
    </div>
  );
};
