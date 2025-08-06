import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { useLocalSearchParams, useRouter } from "expo-router";
import QuizAnswer from "@/components/quiz/quiz-answer";
import CustomButton from "@/components/custom-button";
import LessonComplete from "@/components/quiz/lesson-complete";
import { useQuiz, useSubmitQuiz } from "@/hooks/queries/useCourseQuizzes";
import { useCompleteTopic } from "@/hooks/queries/useTopic";

export default function Quiz() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: number;
  }>({});
  const { id: quizId, topicId, courseProgressId } = useLocalSearchParams();
  const { mutateAsync: completeTopic, isPending: isCompletingTopic } =
    useCompleteTopic();

  const { data: quiz } = useQuiz({
    quizId: quizId as string,
    topicId: topicId as string,
  });

  const {
    mutateAsync: submitQuizMutation,
    isPending: isSubmittingQuiz,
    data,
    isSuccess,
  } = useSubmitQuiz();

  if (data && isSuccess) {
    return (
      <LessonComplete
        xpAmount={data?.xpEarned}
        handlePress={() => {
          router.push(`/(tabs)/(courses)`);
        }}
      />
    );
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-black h-full">
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Loading quiz...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasSelectedAnswer = selectedAnswers[currentQuestion.id] !== undefined;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }));
  };

  const handleNext = async () => {
    if (isLastQuestion) {
      // Submit the quiz
      const answers = Object.entries(selectedAnswers).map(
        ([questionId, answerIndex]) => ({
          questionId,
          selectedAnswer: answerIndex,
        })
      );

      const calls: Promise<any>[] = [
        submitQuizMutation({
          quizId: quizId as string,
          answers,
        }),
      ];

      if (courseProgressId) {
        calls.push(
          completeTopic({
            courseProgressId: courseProgressId as string,
            topicId: topicId as string,
          })
        );
      }

      await Promise.all(calls);
    } else {
      // Move to next question
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const getButtonText = () => {
    if (isSubmittingQuiz) {
      return "Verifying answers...";
    }
    if (isLastQuestion) {
      return "Submit";
    }
    return "Next";
  };

  const getAnswerState = (optionIndex: number) => {
    const selectedAnswer = selectedAnswers[currentQuestion.id];
    if (selectedAnswer === undefined) return "default";
    if (selectedAnswer === optionIndex) return "selected";
    return "default";
  };

  return (
    <SafeAreaView className="flex-1 bg-black h-full">
      <ScrollView
        className="flex-1 px-5 bg-black h-full"
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
            style={{ fontSize: 18 }}
          >
            {quiz.title || "Quiz"}
          </Text>
          <Text
            className="font-medium text-base"
            style={{
              color: "#FFFFFFBF",
              fontFamily: "GeistMono-Medium",
              fontSize: 16,
            }}
          >
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </Text>
        </View>
        <View
          className="flex flex-col h-full"
          style={{ paddingHorizontal: 20 }}
        >
          <Text
            className="text-white font-semibold leading-[22px]"
            style={{
              marginBottom: 26,
              fontFamily: "GeistMono-SemiBold",
              fontSize: 16,
            }}
          >
            {currentQuestion.question}
          </Text>
          <View className="flex flex-col" style={{ gap: 20 }}>
            {currentQuestion.options.map((option, optionIndex) => (
              <QuizAnswer
                key={`${currentQuestion.id}-${optionIndex}`}
                state={getAnswerState(optionIndex)}
                text={option}
                enumerator={enumerator[optionIndex]}
                onPress={() => handleAnswerSelect(optionIndex)}
              />
            ))}
          </View>
          <CustomButton
            text={getButtonText()}
            style={{ marginTop: 122 }}
            handlePress={handleNext}
            isDisabled={!hasSelectedAnswer || isSubmittingQuiz}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const enumerator: { [key: number]: "A" | "B" | "C" | "D" } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};
