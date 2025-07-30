import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import TimeIcon from "@/assets/icons/time-icon";
import Chip from "@/components/chip";
import ChallengeStatus from "@/components/challenge/challenge-status";

export default function CodeChallenge() {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);

  const messages = [
    "Lorem Ipsum sum",
    "Lorem Ipsum laude",
    "Lorem Ipsum",
    "Missing:Lorem Ipsum",
  ];

  if (submit) {
    return <ChallengeStatus status="success" messages={messages} />;
  }
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
            gap: 12,
            borderBottomWidth: 1,
            borderColor: "#FFFFFF40",
            paddingBottom: 11.5,
            paddingHorizontal: 20,
            marginBottom: 24.5,
          }}
        >
          <Text
            className="font-semibold text-white text-lg"
            style={{ fontFamily: "GeistMono-SemiBold" }}
          >
            Token Transfer Logic
          </Text>
          <View className="flex flex-row items-center" style={{ gap: 8 }}>
            <Chip text="Intermediate" variant="violet" size="lg" />
            <View className="flex flex-row items-center" style={{ gap: 2.71 }}>
              <TimeIcon width={12} height={12} stroke="#F25123" />
              <Text
                style={{
                  color: "#F25123",
                  fontSize: 10,
                  fontFamily: "GeistMono-Regular",
                }}
              >
                9:59
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          className="rounded-[10px] py-[9px] items-center"
          style={{
            backgroundColor: "#84E8E8",
            boxShadow: `-1px -1px 5px 0 #FFFFFF73, 1px 1px 5px 0 #FFFFFF73`,
            marginHorizontal: 20,
            marginTop: "auto",
          }}
          onPress={() => setSubmit(true)}
        >
          <Text
            className="text-sm text-black"
            style={{ fontFamily: "GeistMono-Regular" }}
          >
            Submit Solution
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
