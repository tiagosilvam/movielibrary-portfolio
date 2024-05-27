import { Carousel } from "@mantine/carousel";
import { Box, Text } from "@mantine/core";
import { useState } from "react";
import YouTube, { YouTubeEvent } from "react-youtube";

export const VideoCard = ({ videos }: { videos: Video[] }) => {
  const [playing, setPlaying] = useState<YouTubeEvent>({
    target: undefined,
    data: 2,
  });

  return (
    <Box className="space-y-2">
      <Text className="text-lg font-semibold">Mídias</Text>
      {videos.length > 0 ? (
        <Carousel
          height={288}
          withControls={videos.length > 1 && playing.data === 2}
        >
          {videos.map((video, index) => (
            <Carousel.Slide key={index}>
              <YouTube
                className="h-full w-full"
                videoId={video.key}
                iframeClassName="w-full h-full rounded-xl"
                onPlay={setPlaying}
                onPause={setPlaying}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
      ) : (
        <Text className="text-sm italic text-gray-500">
          Não existem mídias até o momento.
        </Text>
      )}
    </Box>
  );
};
