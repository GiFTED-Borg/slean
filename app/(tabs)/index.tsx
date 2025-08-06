import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Chip, { IconChip } from "@/components/chip";
import Card from "@/components/card";
import StatCard from "@/components/stat-card";
import TimeIcon from "@/assets/icons/time-icon";
import ChevronRight from "@/assets/icons/chevron-right";
import PlayIcon from "@/assets/icons/play-icon";
import CustomButton from "@/components/custom-button";
import CornerBracket from "@/components/corner-bracket";
import { useUser } from "@/hooks/queries/useUser";
import { format } from "date-fns";

export default function Home() {
  const router = useRouter();
  const { data: user } = useUser();

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
            <CornerBracket text="Welcome Cadet 🫡" />
            <IconChip
              type="streak"
              text={`${user?.currentStreak || 0} day${
                user?.currentStreak === 1 ? "" : "s"
              }`}
            />
          </View>
          <View>
            <Text
              className="text-sm  text-[#FFFFFF99]"
              style={{ fontFamily: "GeistMono-Regular", fontSize: 14 }}
            >
              Level 1 • Rust Rookie
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 14 }}>
          <Card
            gap={20}
            title="Progress"
            rightExtra={
              <Chip
                size="lg"
                text={format(Date.now(), "EEE, MMM d")}
                variant="blue2"
              />
            }
            info={
              <View className="flex-row" style={{ gap: 10 }}>
                <StatCard
                  type="xp"
                  stat={user?.stats.totalXP ?? 0}
                  text="XP Today"
                />
                <StatCard
                  type="lessons"
                  stat={user?.stats.totalTopicsCompleted ?? 0}
                  text="Lessons"
                />
                <StatCard
                  type="challenge"
                  stat={user?.stats.totalChallengesCompleted ?? 0}
                  text="Challenge"
                />
              </View>
            }
            footer={<CustomButton text="Complete Today’s task" isDisabled />}
            shadow="gold"
          />
        </View>
        {/* <View className="flex flex-col" style={{ marginBottom: 12 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <Text
              className="font-medium text-white text-lg"
              style={{ lineHeight: 19.7, fontFamily: "GeistMono-Medium" }}
            >
              Today’s Challenge
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => router.push("/(tabs)/(challenges)")}
            >
              <Text
                className="text-sm"
                style={{ color: "#84E8E8", fontFamily: "GeistMono-Regular" }}
              >
                View All
              </Text>
              <ChevronRight width={14} height={14} stroke="#84E8E8" />
            </TouchableOpacity>
          </View>
          <Card
            gap={20}
            title="Hello Solana World"
            rightExtra={<Chip size="lg" text="Beginner" variant="green" />}
            headerExtraGap="sm"
            desc="Create your first Solana program that prints a greeting message to the blockchain"
            headerExtra={
              <View
                className="flex flex-row items-center"
                style={{ gap: 8.71 }}
              >
                <IconChip type="xp" text="50 XP" />
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
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{
                  backgroundColor: "#84E8E8",
                  boxShadow: `-1px -1px 5px 0 #FFFFFF73, 1px 1px 5px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  Complete Today’s task
                </Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View> */}
        <View className="flex flex-col" style={{ marginBottom: 12 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <Text
              className="font-medium text-white text-lg"
              style={{
                lineHeight: 19.7,
                fontFamily: "GeistMono-Medium",
                fontSize: 18,
              }}
            >
              Start Learning
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => router.push("/(tabs)/(courses)")}
            >
              <Text
                className="text-sm"
                style={{
                  color: "#84E8E8",
                  fontFamily: "GeistMono-Regular",
                  fontSize: 14,
                }}
              >
                View All
              </Text>
              <ChevronRight width={14} height={14} stroke="#84E8E8" />
            </TouchableOpacity>
          </View>

          <Card
            gap={20}
            title="What is Solana?"
            descColor="#FFFFFF99"
            rightExtra={<PlayIcon fill="#25F082" />}
            headerExtraGap="lg"
            desc="Introduction to Solana Blockchain"
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
                handlePress={() =>
                  router.push("/course/solana-fundamentals/lessons/1")
                }
                text="Start Lesson"
              />
            }
            shadow="silver"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
