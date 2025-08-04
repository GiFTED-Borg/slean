import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { QUERY_KEYS } from "./queries/queryKeys";
import { useQueryFunctions } from "./queries/useQueryFunctions";
import { useSession } from "@/contexts/SessionContext";
import { useCourses } from "./queries/useCourses";

export const usePrefetch = () => {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useSession();
  const { data: courses = [] } = useCourses({ enabled: isAuthenticated });
  const queryFunctions = useQueryFunctions();
  useEffect(() => {
    if (!isAuthenticated) return;

    // Prefetch main data
    const prefetchMainData = async () => {
      await Promise.allSettled([
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.USER],
          queryFn: queryFunctions.user,
          staleTime: 5 * 60 * 1000, // 5 minutes
        }),
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.USER_STREAKS],
          queryFn: queryFunctions.userStreaks,
          staleTime: 5 * 60 * 1000, // 5 minutes
        }),
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.COURSES],
          queryFn: queryFunctions.courses,
          staleTime: 10 * 60 * 1000, // 10 minutes
        }),
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.CHALLENGES],
          queryFn: queryFunctions.challenges,
          staleTime: 10 * 60 * 1000, // 10 minutes
        }),
      ]);
    };

    // Prefetch course topics when courses are available
    const prefetchCourseTopics = async () => {
      if (!courses.length) return;

      const topicPromises = courses.map((course) =>
        queryClient.prefetchQuery({
          queryKey: [QUERY_KEYS.TOPICS, course.id],
          queryFn: () => queryFunctions.topics(course.id),
          staleTime: 10 * 60 * 1000, // 10 minutes
        })
      );

      await Promise.allSettled(topicPromises);
    };

    // Execute prefetch operations
    const executePrefetch = async () => {
      await prefetchMainData();
      // Small delay before prefetching course topics
      setTimeout(prefetchCourseTopics, 100);
    };

    const timer = setTimeout(executePrefetch, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, courses, queryClient, queryFunctions]);
};
