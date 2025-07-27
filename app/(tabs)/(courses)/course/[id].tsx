import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import TimeIcon from "@/assets/icons/time-icon";
import Chip, { IconChip } from "@/components/chip";
import PlayIcon from "@/assets/icons/play-icon";
import Card from "@/components/card";
import CompleteIcon from "@/assets/icons/complete-icon";
import { useRouter } from "expo-router";

export default function Course() {
  const router = useRouter();
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
          <Text
            className="font-medium text-white text-lg"
            style={{ fontFamily: "GeistMono-Medium" }}
          >
            Solana fundamentals
          </Text>
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
                  12 lessons
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
            <Chip variant="green" size="sm" text="Beginner" />
          </View>
        </View>
        <View style={{ marginBottom: 12.38 }}>
          <Card
            gap={20}
            title="What is Solana?"
            descColor="#FFFFFF99"
            rightExtra={<CompleteIcon fill="#25F082" />}
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
              <TouchableOpacity
                onPress={() => router.push("/lessons/1")}
                className="rounded-[10px] w-full py-[9px] items-center border border-cyan-600"
                style={{
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  style={{ color: "#84e8e8", fontFamily: "GeistMono-Regular" }}
                >
                  Review Lesson
                </Text>
              </TouchableOpacity>
            }
            shadow="silver"
          />
        </View>
        <View style={{ marginBottom: 12.38 }}>
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
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{
                  backgroundColor: "#84e8e8",
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  Review Lesson
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{
                  backgroundColor: "#84e8e8",
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  Review Lesson
                </Text>
              </TouchableOpacity>
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
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{
                  backgroundColor: "#84e8e8",
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  Review Lesson
                </Text>
              </TouchableOpacity>
            }
            shadow="silver"
          />
        </View>
        <View>
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
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{
                  backgroundColor: "#84e8e8",
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
                onPress={() => router.push("/quiz/solana-fundamentals")}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  Start Quiz
                </Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
