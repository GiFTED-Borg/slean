import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Chip, { IconChip } from "@/components/chip";
import Card from "@/components/card";
import StatCard from "@/components/stat-card";
import TimeIcon from "@/assets/icons/time-icon";
import ChevronRight from "@/assets/icons/chevron-right";

export default function Home() {
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
        <View className="flex flex-col" style={{ marginBottom: 17 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 16 }}
          >
            <Text className="font-medium text-white text-lg">
              Welcome Cadet 🫡
            </Text>
            <IconChip type="streak" text="3 days" />
          </View>
          <View>
            <Text className="text-sm  text-[#FFFFFF99]">
              Level 3 • Rust Rookie
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 14 }}>
          <Card
            gap={20}
            title="Daily Progress"
            rightExtra={<Chip size="lg" text="Wed, Jul 9" variant="blue2" />}
            info={
              <View className="flex-row" style={{ gap: 10 }}>
                <StatCard type="xp" stat={120} text="XP Today" />
                <StatCard type="lessons" stat={2} text="Lessons" />
                <StatCard type="challenge" stat={1} text="Challenge" />
              </View>
            }
            footer={
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{ backgroundColor: "#84E8E8" }}
              >
                <Text className="text-[#000]">Complete Today’s task</Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
        <View className="flex flex-col" style={{ marginBottom: 12 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <Text
              className="font-medium text-white text-lg"
              style={{ lineHeight: 19.7 }}
            >
              Today’s Challenge
            </Text>
            <TouchableOpacity
              className="flex flex-row items-center"
              onPress={() => router.push("/challenges")}
            >
              <Text className="text-sm" style={{ color: "#84E8E8" }}>
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
                  <Text style={{ color: "#FFFFFF66", fontSize: 10 }}>
                    15 min
                  </Text>
                </View>
              </View>
            }
            footer={
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{ backgroundColor: "#84E8E8" }}
              >
                <Text className="text-[#000]">Complete Today’s task</Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
        <View className="flex flex-col" style={{ marginBottom: 12 }}>
          <View
            className="flex flex-row items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <Text
              className="font-medium text-white text-lg"
              style={{ lineHeight: 19.7 }}
            >
              Continue Learning
            </Text>
            <TouchableOpacity className="flex flex-row items-center">
              <Text className="text-sm" style={{ color: "#84E8E8" }}>
                View All
              </Text>
              <ChevronRight width={14} height={14} stroke="#84E8E8" />
            </TouchableOpacity>
          </View>
          <Card
            gap={20}
            title="Accounts & programs"
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
                  <Text style={{ color: "#FFFFFF66", fontSize: 10 }}>
                    15 min
                  </Text>
                </View>
              </View>
            }
            footer={
              <TouchableOpacity
                className="rounded-[10px] w-full py-[9px] items-center"
                style={{ backgroundColor: "#84E8E8" }}
              >
                <Text className="text-[#000]">Complete Today’s task</Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
