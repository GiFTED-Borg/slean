import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";
import { Link } from "expo-router";
import Card from "@/components/card";
import Chip from "@/components/chip";
import TimeIcon from "@/assets/icons/time-icon";
import PlayIcon from "@/assets/icons/play-icon";
import ProgressBar from "@/components/progress-bar";

export default function Courses() {
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
            <Text
              className="font-medium text-white text-lg"
              style={{ fontFamily: "GeistMono-Medium" }}
            >
              Learning Paths
            </Text>
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
        <View className="flex flex-col" style={{ marginBottom: 13 }}>
          <Link href={`/course/solana-fundamentals`}>
            <Card
              gap={20}
              title="Solana Fundamentals"
              rightExtra={<Chip size="lg" text="Beginner" variant="green" />}
              headerExtraGap="lg"
              desc="Begin your journey into Solana blockchain development with fundamental concepts"
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
              }
              footer={<ProgressBar progress={0.65} />}
              shadow="gold"
            />
          </Link>
        </View>
        <View className="flex flex-col" style={{ marginBottom: 13 }}>
          <Card
            gap={20}
            title="Anchor Framework"
            rightExtra={<Chip size="lg" text="Intermediate" variant="violet" />}
            headerExtraGap="lg"
            desc="Build dApps with Anchor"
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
                    14 lessons
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
                    3h 1min
                  </Text>
                </View>
              </View>
            }
            shadow="gold"
          />
        </View>
        <View className="flex flex-col" style={{ marginBottom: 13 }}>
          <Card
            gap={20}
            title="Advanced Programs & Architecture"
            rightExtra={<Chip size="lg" text="Advanced" variant="yellow" />}
            headerExtraGap="lg"
            desc="Master complex program structures and advanced Solana development patterns"
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
                    8 lessons
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
                    4h 30min
                  </Text>
                </View>
              </View>
            }
            footer={<ProgressBar progress={0.65} />}
            shadow="gold"
          />
        </View>
        <View className="flex flex-col" style={{ marginBottom: 13 }}>
          <Card
            gap={20}
            title="DeFi Development Mastery"
            rightExtra={<Chip size="lg" text="Expert" variant="red" />}
            headerExtraGap="lg"
            desc="Begin your journey into Solana blockchain development with fundamental concepts"
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
            }
            footer={<ProgressBar progress={0.65} />}
            shadow="gold"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
