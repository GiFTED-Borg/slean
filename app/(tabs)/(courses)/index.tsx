import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Card from "@/components/card";
import Chip from "@/components/chip";
import TimeIcon from "@/assets/icons/time-icon";
import PlayIcon from "@/assets/icons/play-icon";
import ProgressBar from "@/components/progress-bar";
import CornerBracket from "@/components/corner-bracket";
import { useCourses } from "@/hooks/queries/useCourses";
import { getChipVariant } from "@/utils/variant";

const CLICKED_COURSES_KEY = "clicked_courses";

export default function Courses() {
  const { data: courses = [] } = useCourses();
  const [clickedCourses, setClickedCourses] = useState<Record<string, boolean>>(
    {}
  );
  const router = useRouter();

  // Load from storage on mount
  useEffect(() => {
    const loadClickedCourses = async () => {
      try {
        const stored = await AsyncStorage.getItem(CLICKED_COURSES_KEY);
        if (stored) {
          setClickedCourses(JSON.parse(stored));
        }
      } catch (err) {
        console.error("Failed to load clicked courses:", err);
      }
    };
    loadClickedCourses();
  }, []);

  // Handle card click
  const handleCardPress = async (courseId: string) => {
    const updated = { ...clickedCourses, [courseId]: true };
    setClickedCourses(updated);
    try {
      await AsyncStorage.setItem(CLICKED_COURSES_KEY, JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save clicked course:", err);
    }
    router.push(`/course/${courseId}`);
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
        <View className="flex flex-col" style={{ marginBottom: 17 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 16 }}
          >
            <CornerBracket text="Learning Paths" />
          </View>
          <Text
            className="text-sm text-[#FFFFFF99]"
            style={{ fontFamily: "GeistMono-Regular", fontSize: 14 }}
          >
            Choose your journey to Solana mastery
          </Text>
        </View>

        {courses.map((course) => (
          <View
            key={course.id}
            className="flex flex-col"
            style={{ marginBottom: 13 }}
          >
            <Pressable onPress={() => handleCardPress(course.id)}>
              <Card
                gap={20}
                title={course.title}
                rightExtra={
                  <Chip
                    size="lg"
                    text={getChipVariant(course.level).text}
                    variant={getChipVariant(course.level).variant}
                  />
                }
                headerExtraGap="lg"
                desc={course.description}
                headerExtra={
                  <View
                    className="flex flex-row items-center"
                    style={{ gap: 8.71 }}
                  >
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
                        {course._count.topics} lessons
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
                }
                footer={
                  (course.completedTopics / course._count.topics === 1 ||
                    clickedCourses[course.id]) && (
                    <ProgressBar
                      progress={course.completedTopics / course._count.topics}
                    />
                  )
                }
                shadow="gold"
              />
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
