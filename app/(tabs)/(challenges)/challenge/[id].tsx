import ChevronRight from "@/assets/icons/chevron-right";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import TimeIcon from "@/assets/icons/time-icon";
import Chip from "@/components/chip";
import PlayIcon from "@/assets/icons/play-icon";
import CustomButton from "@/components/custom-button";
import { useChallenge } from "@/hooks/queries/useChallenge";
import Markdown from "react-native-markdown-display";

import { getChipVariant } from "@/utils/variant";

export default function Challenge() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: challenge } = useChallenge(id as string);

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
            {challenge?.title}
          </Text>
          <View className="flex flex-row items-center" style={{ gap: 8 }}>
            {challenge && (
              <Chip
                text={getChipVariant(challenge.difficulty).text}
                variant={getChipVariant(challenge.difficulty).variant}
                size="lg"
              />
            )}
            <View className="flex flex-row items-center" style={{ gap: 2.71 }}>
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
        </View>
        <View
          className="flex flex-col"
          style={{ marginBottom: 41, paddingHorizontal: 20 }}
        >
          <Text
            className="font-semibold text-white text-base"
            style={{ marginBottom: 31, fontFamily: "GeistMono-SemiBold" }}
          >
            Challenge Description
          </Text>
          <Text
            className="text-base font-medium"
            style={{
              color: "#FFFFFFBF",
              marginBottom: 20,
              fontFamily: "GeistMono-Medium",
            }}
          >
            {challenge?.description}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#161A1A",
            paddingHorizontal: 12,
            paddingTop: 15,
            paddingBottom: 20,
            borderRadius: 10,
          }}
          className="flex flex-col"
        >
          <Markdown
            style={{
              body: { color: "#fff", marginBottom: 31 },
              paragraph: { fontFamily: "GeistMono-Regular" },
            }}
          >
            {challenge?.content}
          </Markdown>
          <CustomButton
            handlePress={() => router.push(`/code-challenge/${id}`)}
            text="Start Challenge"
            endIcon={<PlayIcon fill="#292D32" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
