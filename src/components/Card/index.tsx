import { Box, Text } from "@mantine/core";
import { LoadingImage } from "../Image";

export const Card = ({
  image,
  title,
  label,
  onClick,
}: {
  image: string;
  title: string;
  label: string;
  onClick: () => void;
}) => {
  return (
    <Box className="p-2" onClick={onClick}>
      <Box className="group min-h-72 w-36 cursor-pointer">
        <LoadingImage
          className="h-52 w-full rounded-lg group-hover:scale-105 group-hover:shadow-xl"
          src={`https://media.themoviedb.org/t/p/w300${image}`}
          alt={title}
        />
        <Box className="mt-2 px-2 text-center">
          <Text className="line-clamp-2 text-sm font-medium group-hover:font-semibold">
            {title}
          </Text>
          <Text className="line-clamp-2 text-sm text-gray-500">{label}</Text>
        </Box>
      </Box>
    </Box>
  );
};
