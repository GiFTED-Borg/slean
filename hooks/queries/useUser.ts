import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useQueryFunctions } from "./useQueryFunctions";

export const useUser = () => {
  const queryFunctions = useQueryFunctions();
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: queryFunctions.user,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useUserStreaks = () => {
  const queryFunctions = useQueryFunctions();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_STREAKS],
    queryFn: queryFunctions.userStreaks,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
