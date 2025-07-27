import PlayIcon from "@/assets/icons/play-icon";
import TimeIcon from "@/assets/icons/time-icon";
import Card from "@/components/card";
import Chip, { IconChip } from "@/components/chip";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Challenges() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-black">
      <ScrollView
        className="flex-1 bg-black"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10,
          paddingTop: 20,
        }}
      >
        <View
          className="flex flex-col"
          style={{
            paddingBottom: 16,
            marginBottom: 16,
            borderBottomWidth: 1,
            borderBottomColor: "#FFFFFF40",
          }}
        >
          <View
            className="flex flex-row items-center justify-between"
            style={{ paddingHorizontal: 20 }}
          >
            <Text
              className="font-medium text-white text-lg"
              style={{ fontFamily: "GeistMono-Medium" }}
            >
              Challenges
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 18, paddingHorizontal: 20 }}>
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
                onPress={() => router.push("/challenge/hello-solana-world")}
                style={{
                  backgroundColor: "#84E8E8",
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <View className="flex flex-row items-center justify-center">
                  <Text
                    className="text-[#000]"
                    style={{ marginRight: 10, fontFamily: "GeistMono-Regular" }}
                  >
                    Start Challenge
                  </Text>
                  <PlayIcon fill="#292D32" />
                </View>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
        <View style={{ marginBottom: 18, paddingHorizontal: 20 }}>
          <Card
            gap={20}
            title="Token Transfer Logic"
            rightExtra={<Chip size="lg" text="Intermediate" variant="violet" />}
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
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  <View className="flex flex-row items-center justify-center gap-x-2.5">
                    <Text className="text-[#000]" style={{ marginRight: 10 }}>
                      Start Challenge
                    </Text>
                    <PlayIcon fill="#292D32" />
                  </View>
                </Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
        <View style={{ marginBottom: 18, paddingHorizontal: 20 }}>
          <Card
            gap={20}
            title="Token Transfer Logic"
            rightExtra={<Chip size="lg" text="Intermediate" variant="violet" />}
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
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text
                  className="text-[#000]"
                  style={{ fontFamily: "GeistMono-Regular" }}
                >
                  <View className="flex flex-row items-center justify-center gap-x-2.5">
                    <Text className="text-[#000]" style={{ marginRight: 10 }}>
                      Start Challenge
                    </Text>
                    <PlayIcon fill="#292D32" />
                  </View>
                </Text>
              </TouchableOpacity>
            }
            shadow="gold"
          />
        </View>
        <View style={{ marginBottom: 18, paddingHorizontal: 20 }}>
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
                  boxShadow: `-1px -1px 10px 0 #FFFFFF73, 1px 1px 10px 0 #FFFFFF73`,
                }}
              >
                <Text className="text-[#000]">
                  <View className="flex flex-row items-center justify-center gap-x-2.5">
                    <Text
                      className="text-[#000]"
                      style={{
                        marginRight: 10,
                        fontFamily: "GeistMono-Regular",
                      }}
                    >
                      Start Challenge
                    </Text>
                    <PlayIcon fill="#292D32" />
                  </View>
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
