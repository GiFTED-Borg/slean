import { useApi } from "@/clients/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { CourseProgress, Quiz, Topic, TopicProgress } from "./types";
import { useTopics } from "./useTopics";

interface TopicResponse extends Topic {
  quizzes: Quiz[];
  progresses: TopicProgress[];
  course: { progresses: CourseProgress[]; title: string };
}

export const useTopic = (courseId: string, topicId: string) => {
  const { get } = useApi();
  const { data: topics = [] } = useTopics(courseId);
  return useQuery({
    queryKey: [QUERY_KEYS.TOPIC, courseId, topicId],
    queryFn: async () => {
      const response = await get<TopicResponse>(
        `/courses/${courseId}/topics/${topicId}`
      );

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch topics");
      }

      return response.data;
    },
    enabled: !!courseId && !!topicId,
    initialData: topics.find((topic) => topic.id === topicId) as TopicResponse,
  });
};

interface CompleteTopicData {
  courseProgressId: string;
  topicId: string;
}

interface CompleteTopicResponse {
  id: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  startedAt: Date;
  completedAt: Date | null;
  courseProgressId: string;
  topicId: string;
}

export const useCompleteTopic = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (completeTopicData: CompleteTopicData) => {
      const response = await post<CompleteTopicResponse>(
        `/courses/complete-topic`,
        completeTopicData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.TOPICS] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
    },
  });
};
