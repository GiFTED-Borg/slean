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
            style={{ fontFamily: "GeistMono-Semibold" }}
          >
            {topic?.course?.title || "Solana fundamentals"}
          </Text>
          <Text
            className="font-medium text-base"
            style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
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
        {/* <View
          className="flex flex-col"
          style={{ marginBottom: 46, paddingHorizontal: 20 }}
        >
          <Text
            className="font-semibold text-white text-base"
            style={{ marginBottom: 36, fontFamily: "GeistMono-SemiBold" }}
          >
            What is Solana?
          </Text>
          <Text
            className="text-base font-medium"
            style={{
              color: "#FFFFFFBF",
              marginBottom: 20,
              fontFamily: "GeistMono-Medium",
            }}
          >
            Solana accounts are fundamental data structures that store state on
            the blockchain. Unlike Ethereum where contracts store state
            internally, Solana separates program logic from data storage.
          </Text>
          <Text
            className="text-base font-medium"
            style={{
              color: "#FFFFFFBF",
              marginBottom: 20,
              fontFamily: "GeistMono-Medium",
            }}
          >
            ## Key Concepts:
          </Text>
          <View className="flex flex-col" style={{ gap: 4 }}>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
            >
              - **Accounts store data and SOL balance**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
            >
              - **Programs (smart contracts) are stateless**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
            >
              - **Each account has a unique public key**
            </Text>
            <Text
              className="text-base font-medium"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
            >
              - **Accounts can be owned by programs or users**
            </Text>
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 20,
            marginBottom: 48,
            backgroundColor: "#161A1A",
            borderRadius: 10,
            gap: 2,
          }}
          className="flex flex-col items-center justify-center"
        >
          <Text
            className="text-xs"
            style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
          >
            {`
              // Example account structure
            {
                "lamports": 1000000000, // Balance in lamports
                "owner": "11111111111111111111111111111111",
                "data": [], // Account data
                "executable": false, // Is this a program?
                "rent_epoch": 200 // Rent payment info
            }
            `}
          </Text>
        </View> */}
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
