import { useApi } from "@/clients/api";
import { User, Course, Challenge } from "./types";

export const useQueryFunctions = () => {
  const { get } = useApi();
  return {
    user: async () => {
      const response = await get<User>(`/users/profile`);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch user");
      }
      return response.data;
    },

    userStreaks: async () => {
      const response = await get(`/users/streaks`);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch user streaks");
      }
      return response.data;
    },

    courses: async () => {
      const response = await get<Course[]>(`/courses`);
      return response.data;
    },

    challenges: async () => {
      const response = await get<Challenge[]>(`/challenges`);
      return response.data;
    },

    topics: async (courseId: string) => {
      const response = await get(`/courses/${courseId}/topics`);
      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch topics");
      }
      return response.data;
    },

    course: async (courseId: string) => {
      const response = await get<Course>(`/courses/${courseId}`);
      return response.data;
    },

    challenge: async (challengeId: string) => {
      const response = await get(`/challenges/${challengeId}`);
      return response.data;
    },
  };
};
