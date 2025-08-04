import { useApi } from "@/clients/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import { Quiz } from "./types";

export const useCourseQuizzes = (courseId: string) => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.COURSES, courseId, "quizzes"],
    queryFn: async () => {
      const response = await get<Quiz[]>(`/courses/${courseId}/quizzes`);

      return response.data;
    },
    enabled: !!courseId,
  });
};

export const useQuiz = ({
  quizId,
  topicId,
}: {
  quizId: string;
  topicId: string | undefined;
}) => {
  const { get } = useApi();
  return useQuery({
    queryKey: [QUERY_KEYS.QUIZ, quizId, topicId],
    queryFn: async () => {
      const url = topicId
        ? `/courses/topics/${topicId}/quizzes/${quizId}`
        : `/courses/quizzes/${quizId}`;
      const response = await get<Quiz>(url);
      return response.data;
    },
    enabled: !!quizId,
  });
};

export interface QuizAnswer {
  questionId: string;
  selectedAnswer: number; // index of the selected answer
}

export interface SubmitQuizData {
  quizId: string;
  answers: QuizAnswer[];
}

export interface SubmitQuizResponse {
  id: string;
  userId: string;
  completedAt: string;
  createdAt: string;
  quizId: string;
  answers: QuizAnswer[];
  score: number;
  isCorrect: boolean;
  xpEarned: number;
}

export const useSubmitQuiz = () => {
  const { post } = useApi();
  return useMutation({
    mutationFn: async (submitQuizData: SubmitQuizData) => {
      const response = await post<SubmitQuizResponse>(
        `/courses/quizzes/submit`,
        submitQuizData
      );

      return response.data;
    },
  });
};
