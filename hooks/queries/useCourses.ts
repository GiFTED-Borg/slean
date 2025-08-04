import { useApi } from "@/clients/api";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { Course } from "./types";

export const useCourses = () => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: async () => {
      const response = await get<Course[]>(`/courses`);

      return response.data;
    },
    throwOnError: (error: any) => {
      console.log("error", error);
      return false;
    },
  });
};
