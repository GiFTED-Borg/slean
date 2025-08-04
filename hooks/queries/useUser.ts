import { useApi } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { User } from "./types";

export const useUser = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: async () => {
      const response = await get<User>(`/users/profile`);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch user");
      }
      return response.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

interface UserStreak {
  id: string;
  date: string;
  activity: string;
}

export const useUserStreaks = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_STREAKS],
    queryFn: async () => {
      const response = await get<UserStreak[]>(`/users/streaks`);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch user");
      }
      return response.data;
    },
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
