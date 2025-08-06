import { useState } from "react";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import TimeIcon from "@/assets/icons/time-icon";
import Chip from "@/components/chip";
import ChallengeStatus from "@/components/challenge/challenge-status";
import {
  useChallenge,
  useCompleteChallenge,
} from "@/hooks/queries/useChallenge";
import CodeBlock from "@/components/code-block";
import { getChipVariant } from "@/utils/variant";
import { useCountDown } from "@/hooks/useCountDown";

export default function CodeChallenge() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data: challenge, isLoading } = useChallenge(id as string);
  const [submit, setSubmit] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const { mutate: completeChallenge } = useCompleteChallenge();

  const handleCompleteChallenge = () => {
    setSubmit(true);
    completeChallenge({
      challengeId: id as string,
      answer: inputValue,
    });
  };

  const { formattedTime } = useCountDown({
    initialTime: 60 * 5,
    autoStart: true,
    onComplete: handleCompleteChallenge,
  });

  const successMessages = [
    "Congratulations! You've completed the challenge.",
    `You've earned ${challenge?.xpReward} XP 🚀`,
  ];

  const errorMessages = [
    `The correct answer is: ${challenge?.codeSnippetOutput}`,
  ];

  if (submit) {
    const isCorrect = challenge?.codeSnippetOutput === inputValue;
    return (
      <ChallengeStatus
        status={isCorrect ? "success" : "error"}
        messages={isCorrect ? successMessages : errorMessages}
        handlePress={() => router.replace("/(tabs)/(challenges)")}
        xpAmount={challenge?.xpReward ?? 0}
      />
    );
  }

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!challenge) {
    return <Text>Challenge not found</Text>;
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
            {challenge?.title}
          </Text>
          <View className="flex flex-row items-center" style={{ gap: 8 }}>
            <Chip
              text={getChipVariant(challenge.difficulty).text}
              variant={getChipVariant(challenge.difficulty).variant}
              size="lg"
            />
            <View className="flex flex-row items-center" style={{ gap: 2.71 }}>
              <TimeIcon width={12} height={12} stroke="#F25123" />
              <Text
                style={{
                  color: "#F25123",
                  fontSize: 10,
                  fontFamily: "GeistMono-Regular",
                }}
              >
                {formattedTime.minutes}:{formattedTime.seconds}
              </Text>
            </View>
          </View>
        </View>

        <CodeBlock
          inputValue={inputValue}
          setInputValue={setInputValue}
          tokens={challenge?.codeSnippet ?? []}
        />

        <TouchableOpacity
          className="rounded-[10px] py-[9px] items-center"
          style={{
            backgroundColor: "#84E8E8",
            boxShadow: `-1px -1px 5px 0 #FFFFFF73, 1px 1px 5px 0 #FFFFFF73`,
            marginHorizontal: 20,
            marginTop: 20,
          }}
          onPress={handleCompleteChallenge}
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
