import { useApi } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { Challenge } from "./types";

export const useChallenges = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.CHALLENGES],
    queryFn: async () => {
      const response = await get<Challenge[]>(`/challenges`);

      return response.data;
    },
    throwOnError: (error: any) => {
      console.log("error", error);
      return false;
    },
  });
};
