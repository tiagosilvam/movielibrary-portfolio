import { Box, Text } from "@mantine/core";

export const Navbar = () => {
  return (
    <Box className="w-full h-full flex items-center pl-12">
      <div className="space-x-12 flex items-center">
        <Text>Logo</Text>
        <Text className="font-bold text-2xl">Header</Text>
      </div>
    </Box>
  );
};
