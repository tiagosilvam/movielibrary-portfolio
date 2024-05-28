import { Carousel as MUICarousel } from "@mantine/carousel";
import { Card } from "@/components/Card";
import { useRouter } from "next/navigation";
import { Box, Text } from "@mantine/core";

export const Carousel = ({
  title,
  media,
  type,
}: {
  title: string;
  media: Movie[] | Serie[] | Person[];
  type: "movie" | "tv" | "person";
}) => {
  const { push } = useRouter();

  return (
    <Box className="space-y-2">
      <Text className="text-lg font-semibold">{title}</Text>
      {media.length > 0 ? (
        <MUICarousel slideSize="144px" slidesToScroll={2} align="start" loop>
          {media.map((media, index) => (
            <Card
              key={index}
              image={
                (media as Person).profile_path ??
                (media as Movie | Serie).poster_path
              }
              title={(media as Serie | Person).name ?? (media as Movie).title}
              label={
                (media as Movie).release_date ??
                (media as Serie).first_air_date ??
                (media as Person).character
              }
              onClick={() => push(`/${type}/${media.id}`)}
            />
          ))}
        </MUICarousel>
      ) : (
        <Text className="text-sm italic text-gray-500">
          Não existem informações até o momento.
        </Text>
      )}
    </Box>
  );
};
