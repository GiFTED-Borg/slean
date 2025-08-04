import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import TimeIcon from "@/assets/icons/time-icon";
import Chip, { IconChip } from "@/components/chip";
import PlayIcon from "@/assets/icons/play-icon";
import Card from "@/components/card";
import CompleteIcon from "@/assets/icons/complete-icon";
import { useLocalSearchParams, useRouter } from "expo-router";
import CustomButton from "@/components/custom-button";
import CornerBracket from "@/components/corner-bracket";
import { useTopics } from "@/hooks/queries/useTopics";
import { useCourseQuizzes } from "@/hooks/queries/useCourseQuizzes";
import { useCourse, useStartCourse } from "@/hooks/queries/useCourse";
import { getChipVariant } from "@/utils/variant";

export default function Course() {
  const router = useRouter();
  const { id: courseId } = useLocalSearchParams();
  const { data: topics = [] } = useTopics(courseId as string);
  const { data: quizzes = [] } = useCourseQuizzes(courseId as string);
  const { data: course } = useCourse(courseId as string);

  const { mutateAsync: startCourse, isPending: isStartingCourse } =
    useStartCourse();

  const handleStartCourse = async (index: number) => {
    if (index === 0 && course?.progresses.length === 0) {
      await startCourse({ courseId: courseId as string });
    }
    router.push(`/course/${courseId}/lessons/${topics[index].id}`);
  };

  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 px-5 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}
      >
        <View className="flex flex-col" style={{ marginBottom: 19, gap: 16 }}>
          <CornerBracket text={course?.title || ""} />
          <View className="flex flex-row items-center justify-between">
            <View className="flex flex-row items-center" style={{ gap: 24 }}>
              <View
                className="flex flex-row items-center"
                style={{ gap: 2.71 }}
              >
                <PlayIcon width={12} height={12} fill="#FFFFFF66" />
                <Text
                  style={{
                    color: "#FFFFFF66",
                    fontSize: 10,
                    fontFamily: "GeistMono-Regular",
                  }}
                >
                  {topics.length} lessons
                </Text>
              </View>
              <View
                className="flex flex-row items-center"
                style={{ gap: 2.71 }}
              >
                <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                <Text
                  style={{
                    color: "#FFFFFF66",
                    fontSize: 10,
                    fontFamily: "GeistMono-Regular",
                  }}
                >
                  2h 30min
                </Text>
              </View>
            </View>
            <Chip
              variant={getChipVariant(course?.level || "").variant}
              size="sm"
              text={getChipVariant(course?.level || "").text}
            />
          </View>
        </View>

        {topics?.map((topic, index, topics) => (
          <View key={topic.id} style={{ marginBottom: 12.38 }}>
            <Card
              gap={20}
              title={topic.title}
              descColor="#FFFFFF99"
              rightExtra={
                topic.progresses.length > 0 ? (
                  <CompleteIcon fill="#25F082" />
                ) : (
                  <PlayIcon width={24} height={24} fill="#25F082" />
                )
              }
              headerExtraGap="lg"
              desc={topic.description}
              headerExtra={
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 8.71 }}
                >
                  <Chip variant="violet" text="Theory" size="md" />
                  <View
                    className="flex flex-row items-center"
                    style={{ gap: 2.71 }}
                  >
                    <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                    <Text
                      style={{
                        color: "#FFFFFF66",
                        fontSize: 10,
                        fontFamily: "GeistMono-Regular",
                      }}
                    >
                      15 min
                    </Text>
                  </View>
                </View>
              }
              footer={
                <CustomButton
                  isDisabled={isStartingCourse}
                  handlePress={() => handleStartCourse(index)}
                  text={
                    isStartingCourse
                      ? "Starting..."
                      : topic.progresses.length > 0
                        ? "Review Lesson"
                        : "Start Lesson"
                  }
                  variant={topic.progresses.length > 0 ? "outline" : undefined}
                />
              }
              shadow="silver"
            />
          </View>
        ))}
        {/* <View style={{ marginBottom: 12.38 }}>
          <Card
            gap={20}
            title="Setting up development Environment"
            rightExtra={<PlayIcon width={24} height={24} fill="#25F082" />}
            headerExtraGap="lg"
            desc="Install Solana CLI and tools"
            descColor="#FFFFFF99"
            headerExtra={
              <View
                className="flex flex-row items-center"
                style={{ gap: 8.71 }}
              >
                <Chip variant="blue" text="Hands-on" size="md" />
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 2.71 }}
                >
                  <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                  <Text
                    style={{
                      color: "#FFFFFF66",
                      fontSize: 10,
                      fontFamily: "GeistMono-Regular",
                    }}
                  >
                    15 min
                  </Text>
                </View>
              </View>
            }
            footer={
              <CustomButton
                handlePress={() => router.push("/lessons/2")}
                text="Start Lesson"
              />
            }
            shadow="silver"
          />
        </View>
        <View style={{ marginBottom: 12.38 }}>
          <Card
            gap={20}
            title="Understanding Accounts"
            rightExtra={<PlayIcon width={24} height={24} fill="#25F082" />}
            headerExtraGap="lg"
            desc="How Solana Accounts work"
            descColor="#FFFFFF99"
            headerExtra={
              <View
                className="flex flex-row items-center"
                style={{ gap: 8.71 }}
              >
                <Chip variant="violet" text="Theory" size="md" />
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 2.71 }}
                >
                  <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                  <Text
                    style={{
                      color: "#FFFFFF66",
                      fontSize: 10,
                      fontFamily: "GeistMono-Regular",
                    }}
                  >
                    15 min
                  </Text>
                </View>
              </View>
            }
            footer={
              <CustomButton
                handlePress={() => router.push("/lessons/2")}
                text="Start Lesson"
              />
            }
            shadow="silver"
          />
        </View>
        <View style={{ marginBottom: 12.38 }}>
          <Card
            gap={20}
            title="Your First Transaction"
            rightExtra={<PlayIcon width={24} height={24} fill="#25F082" />}
            headerExtraGap="lg"
            desc="Introduction to Solana Blockchain"
            descColor="#FFFFFF99"
            headerExtra={
              <View
                className="flex flex-row items-center"
                style={{ gap: 8.71 }}
              >
                <Chip variant="blue" text="Hands-on" size="md" />
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 2.71 }}
                >
                  <TimeIcon width={12} height={12} stroke="#FFFFFF66" />
                  <Text
                    style={{
                      color: "#FFFFFF66",
                      fontSize: 10,
                      fontFamily: "GeistMono-Regular",
                    }}
                  >
                    15 min
                  </Text>
                </View>
              </View>
            }
            footer={
              <CustomButton
                handlePress={() => router.push("/lessons/2")}
                text="Start Lesson"
              />
            }
            shadow="silver"
          />
        </View> */}
        {quizzes.map((quiz) => (
          <View key={quiz.id}>
            <Card
              gap={20}
              title="Solana Fundamentals"
              rightExtra={<PlayIcon width={24} height={24} fill="#25F082" />}
              headerExtraGap="lg"
              desc="Solana Fundamentals Assessment"
              descColor="#FFFFFF99"
              headerExtra={
                <View
                  className="flex flex-row items-center"
                  style={{ gap: 8.71 }}
                >
                  <Chip variant="blue" text="Hands-on" size="md" />
                  <IconChip type="xp" text="50 XP" />
                </View>
              }
              footer={
                <CustomButton
                  handlePress={() => router.push(`/quiz/${quiz.id}`)}
                  text="Start Quiz"
                />
              }
              shadow="solid-gold"
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
