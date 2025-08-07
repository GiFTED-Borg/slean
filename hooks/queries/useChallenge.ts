import { useApi } from "@/clients/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

type CompleteChallengeData = {
  challengeId: string;
  answer: string;
};

export const useCompleteChallenge = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (completeChallengeData: CompleteChallengeData) => {
      return post<Challenge>(`/challenges/submit`, completeChallengeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CHALLENGES] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_STREAKS] });
    },
  });
};
