import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, Dimensions } from "react-native";
import { Link } from "expo-router";
import Card from "@/components/card";
import Chip from "@/components/chip";
import TimeIcon from "@/assets/icons/time-icon";
import PlayIcon from "@/assets/icons/play-icon";
import ProgressBar from "@/components/progress-bar";
import CornerBracket from "@/components/corner-bracket";
import { useCourses } from "@/hooks/queries/useCourses";
import { getChipVariant } from "@/utils/variant";

export default function Courses() {
  const { data: courses = [] } = useCourses();

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
          <View>
            <Text
              className="text-sm  text-[#FFFFFF99]"
              style={{ fontFamily: "GeistMono-Regular" }}
            >
              Choose your journey to Solana mastery
            </Text>
          </View>
        </View>
        {courses.map((course) => (
          <View
            key={course.id}
            className="flex flex-col"
            style={{ marginBottom: 13 }}
          >
            <Link href={`/course/${course.id}`}>
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
                  <ProgressBar
                    progress={course.completedTopics / course._count.topics}
                    width={Dimensions.get("screen").width - 66} // 66 = padding of the card & screen
                  />
                }
                shadow="gold"
              />
            </Link>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
