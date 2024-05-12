import { Box, Text, Image, Skeleton } from "@mantine/core";
import { East, West } from "@mui/icons-material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

const handleClickArrow = (
  direction: string,
  node: HTMLDivElement,
  setLeft: Dispatch<SetStateAction<boolean>>,
  setRight: Dispatch<SetStateAction<boolean>>
) => {
  const scrollAmount = 100;
  if (direction === "right") {
    node.scrollTo({
      left: node.scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  } else if (direction === "left") {
    node.scrollTo({
      left: node.scrollLeft - scrollAmount,
      behavior: "smooth",
    });
  }
  console.log("A");
  setRight(node.scrollLeft + node.clientWidth >= node.scrollWidth);
  setLeft(node.scrollLeft === 0);
};

export const Movie = ({
  popular,
  title,
  loading,
  limit,
}: {
  popular: { results: Movie[] };
  title: string;
  loading: boolean;
  limit: number;
}) => {
  const [left, setLeft] = useState<boolean>(true);
  const [right, setRight] = useState<boolean>(false);
  const [divRef, setDivRef] = useState<HTMLDivElement | null>(null);
  const divRefCallback = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.addEventListener("wheel", (e) => {
        e.preventDefault();
        setLeft(node.scrollLeft === 0);
        node.scrollTo({
          left: (node.scrollLeft += e.deltaY),
          behavior: "smooth",
        });
        setRight(node.scrollLeft + node.clientWidth >= node.scrollWidth);
      });
    }
  }, []);

  return (
    <Box>
      <Text className="text-xl ml-16 mb-4 font-semibold ">{title}</Text>
      <Box className="relative">
        <Box
          className="flex overflow-auto no-scrollbar space-x-3 px-16"
          ref={(node) => {
            if (node) {
              setDivRef(node);
              divRefCallback(node);
            }
          }}
        >
          {loading ? (
            <Skeleton className="w-full h-72" />
          ) : (
            popular.results.map((movie, index) => (
              <Box className="flex flex-col group cursor-pointer" key={index}>
                <Image
                  className="min-h-56 min-w-36 rounded-lg group-hover:scale-105 group-hover:shadow-xl"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />
                <Box className="mt-5 text-center">
                  <Text className="text-sm group-hover:font-bold text-gray-700 font-semibold group-hover:text-black">
                    {movie.title}
                  </Text>
                  <Text className="text-sm text-gray-500">
                    {movie.release_date}
                  </Text>
                </Box>
              </Box>
            ))
          )}
        </Box>
        {!left && (
          <Box
            className="flex items-center absolute top-1/3 bg-zinc-200 ml-2 p-2 rounded-full animate-pulse shadow-lg cursor-pointer hover:animate-none"
            onClick={() => {
              if (divRef) {
                handleClickArrow("left", divRef, setLeft, setRight);
              }
            }}
          >
            <West />
          </Box>
        )}
        {!right && (
          <Box
            className="flex items-center right-0 absolute top-1/3 bg-zinc-200 mr-2 p-2 rounded-full animate-pulse shadow-lg cursor-pointer hover:animate-none"
            onClick={() => {
              if (divRef) {
                handleClickArrow("right", divRef, setLeft, setRight);
              }
            }}
          >
            <East />
          </Box>
        )}
      </Box>
    </Box>
  );
};
