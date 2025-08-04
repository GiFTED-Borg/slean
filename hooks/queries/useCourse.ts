import { useApi } from "@/clients/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { Course } from "./types";
import { useCourses } from "./useCourses";

export const useCourse = (courseId: string) => {
  const { data: courses = [] } = useCourses();
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.COURSES, courseId],
    queryFn: async () => {
      const response = await get<Course>(`/courses/${courseId}`);

      return response.data;
    },
    enabled: !!courseId,
    initialData: courses.find((course) => course.id === courseId),
  });
};

interface StartCourseData {
  courseId: string;
}

export const useStartCourse = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.COURSES, "start"],
    mutationFn: async (startCourseData: StartCourseData) => {
      const response = await post<Course>(`/courses/start`, startCourseData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COURSES] });
    },
  });
};

export const useFinishCourse = () => {
  const { post } = useApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: [QUERY_KEYS.COURSES, "finish"],
    mutationFn: async () => {
      const response = await post<Course>(`/courses/finish`, {});
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COURSES] });
    },
  });
};
