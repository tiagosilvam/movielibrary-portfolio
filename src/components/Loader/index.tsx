import { Loader as MUILoader, Box } from "@mantine/core";

export const Loader = () => {
  return (
    <Box className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2">
      <MUILoader type="bars" size="sm" />
    </Box>
  );
};
