import { useApi } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { Topic } from "./types";

export const useTopics = (courseId: string) => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.TOPICS, courseId],
    queryFn: async () => {
      const response = await get<Topic[]>(`/courses/${courseId}/topics`);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch topics");
      }

      return response.data;
    },
    enabled: !!courseId,
  });
};
