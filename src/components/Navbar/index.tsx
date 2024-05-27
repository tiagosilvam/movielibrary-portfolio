import {
  ActionIcon,
  Box,
  Container,
  Input,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import {
  DarkMode,
  LightMode,
  LiveTvRounded,
  Search,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { toggleColorScheme } = useMantineColorScheme();
  const { push } = useRouter();

  return (
    <Container size="xl" className="flex h-full w-full items-center space-x-4">
      <Box
        className="flex cursor-pointer items-center space-x-4"
        onClick={() => push("/")}
      >
        <LiveTvRounded fontSize="large" />
        <Text className="text-2xl font-bold">TMDB</Text>
      </Box>
      <Input
        className="w-[65%]"
        placeholder="Pesquisar"
        rightSection={<Search />}
        variant="filled"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            push(`/search/${event.currentTarget.value}`);
          }
        }}
      />
      <ActionIcon
        variant="transparent"
        onClick={() => toggleColorScheme()}
        darkHidden
      >
        <DarkMode />
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        onClick={() => toggleColorScheme()}
        lightHidden
      >
        <LightMode />
      </ActionIcon>
    </Container>
  );
};
