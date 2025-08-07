import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/custom-button";
import { useCompleteTopic, useTopic } from "@/hooks/queries/useTopic";
import Markdown from "react-native-markdown-display";
import { useTopics } from "@/hooks/queries/useTopics";
import { useCallback, useMemo } from "react";
import { markdownStyles } from "@/utils/markdown";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/hooks/queries/queryKeys";

export default function Lesson() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: courseId, lessonId } = useLocalSearchParams();
  const { data: topics = [] } = useTopics(courseId as string);
  const { data: topic } = useTopic(courseId as string, lessonId as string);
  const { mutateAsync: completeTopic, isPending: isCompletingTopic } =
    useCompleteTopic();
  const currentLessonIndex = topics.findIndex((topic) => topic.id === lessonId);
  const nextLessonId = topics[currentLessonIndex + 1]?.id;
  const isLastLesson = currentLessonIndex === topics.length - 1;

  const hasQuiz = !!topic?.quizzes?.length;

  const isCompleted = !!topic?.progresses?.[0]?.completedAt;

  const label = useMemo(() => {
    if (isCompletingTopic) {
      return "Loading...";
    }
    if (isCompleted) {
      return "Completed";
    }
    if (hasQuiz) {
      return "Take Quiz";
    }
    if (!isLastLesson) {
      return "Next Lesson";
    }
    return "Finish Course";
  }, [isCompletingTopic, hasQuiz, isLastLesson, isCompleted]);

  const handleNextLesson = useCallback(async () => {
    const courseProgressId = topic?.course?.progresses?.[0]?.id as string;

    const topicProgress = await completeTopic({
      courseProgressId,
      topicId: lessonId as string,
    });
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEYS.TOPICS, courseId],
    });
    if (hasQuiz) {
      const url = `/quiz/${topic?.quizzes?.[0]?.id}?topicId=${lessonId}&${
        topicProgress?.courseProgressId
          ? `&courseProgressId=${topicProgress.courseProgressId}`
          : ""
      }` as const;
      router.replace(url);
      return;
    }
    if (nextLessonId) {
      router.replace(`/course/${courseId}/lessons/${nextLessonId}`);
      return;
    }

    router.replace(`/course/${courseId}`);
  }, [
    topic,
    completeTopic,
    lessonId,
    hasQuiz,
    nextLessonId,
    router,
    courseId,
    queryClient,
  ]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 px-5 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ marginBottom: 17, paddingHorizontal: 20 }}
        >
          <ChevronRight
            width={24}
            height={24}
            stroke="#292D32"
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </TouchableOpacity>
        <View
          className="flex flex-col"
          style={{
            gap: 7,
            borderBottomWidth: 1,
            borderColor: "#FFFFFF40",
            paddingBottom: 11.5,
            marginBottom: 24.5,
            paddingHorizontal: 20,
          }}
        >
          <Text
            className="font-semibold text-white text-lg"
            style={{ fontFamily: "GeistMono-Semibold", fontSize: 18 }}
          >
            {topic?.course?.title || "Solana fundamentals"}
          </Text>
          <Text
            className="font-medium text-base"
            style={{
              color: "#FFFFFFBF",
              fontFamily: "GeistMono-Medium",
              fontSize: 16,
            }}
          >
            {topic?.title}
          </Text>
        </View>
        <View
          className="flex flex-col"
          style={{ marginBottom: 46, paddingHorizontal: 20 }}
        >
          <Markdown style={markdownStyles}>{topic?.content}</Markdown>
        </View>

        <CustomButton
          text={label}
          style={{ marginHorizontal: 20, width: "auto" }}
          handlePress={handleNextLesson}
          isDisabled={isCompletingTopic || isCompleted}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
