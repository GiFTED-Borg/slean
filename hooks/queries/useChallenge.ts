import { useApi } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useChallenges } from "./useChallenges";
import { Challenge } from "./types";

export const useChallenge = (id: string) => {
  const { get } = useApi();
  const { data: challenges = [] } = useChallenges();
  return useQuery({
    queryKey: [QUERY_KEYS.CHALLENGE, id],
    queryFn: async () => {
      const response = await get<Challenge>(`/challenges/${id}`);

      return response.data;
    },
    enabled: !!id,
    initialData: challenges.find((challenge) => challenge.id === id),
  });
};
