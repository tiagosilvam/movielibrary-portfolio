import { api } from "@/hooks/useApi";

export const fetcher = (url: string) => {
  return api().get(url);
};
