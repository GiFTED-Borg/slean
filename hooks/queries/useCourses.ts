import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { useQueryFunctions } from "./useQueryFunctions";

export const useCourses = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const queryFunctions = useQueryFunctions();
  return useQuery({
    queryKey: [QUERY_KEYS.COURSES],
    queryFn: queryFunctions.courses,
    throwOnError: (error: any) => {
      console.log("error", error);
      return false;
    },
    enabled,
  });
};
