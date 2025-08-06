import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useQueryFunctions } from "./useQueryFunctions";

export const useChallenges = () => {
  const queryFunctions = useQueryFunctions();
  return useQuery({
    queryKey: [QUERY_KEYS.CHALLENGES],
    queryFn: queryFunctions.challenges,
    throwOnError: (error: any) => {
      console.log("myChallengesWerror", error);
      return false;
    },
  });
};
