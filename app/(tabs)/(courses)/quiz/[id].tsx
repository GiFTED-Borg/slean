import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import ChevronRight from "@/assets/icons/chevron-right";
import { useRouter } from "expo-router";
import QuizAnswer from "@/components/quiz/quiz-answer";
import CustomButton from "@/components/custom-button";
import LessonComplete from "@/components/quiz/lesson-complete";

export default function Quiz() {
  const router = useRouter();
  const [finish, setFinish] = useState(false);

  if (finish) {
    return <LessonComplete />;
  }

  const question = "Which of these doesn’t fall under the System account type?";
  const btnText = "Submit";
  const options: {
    ans: string;
    state: "default" | "selected" | "wrong" | "correct";
  }[] = [
    {
      ans: "Store application state",
      state: "default",
    },
    {
      ans: "Store SOL balance",
      state: "default",
    },
    {
      ans: "Owned by the system program",
      state: "default",
    },
    {
      ans: "User wallets are sytem accountse",
      state: "default",
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-black h-full">
      <ScrollView
        className="flex-1 px-5 bg-black h-full"
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
            gap: 7,
            borderBottomWidth: 1,
            borderColor: "#FFFFFF40",
            paddingBottom: 11.5,
            marginBottom: 24.5,
            paddingHorizontal: 20,
          }}
        >
          <Text className="font-semibold text-white text-lg">
            Solana fundamentals
          </Text>
          <Text
            className="font-medium text-base"
            style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Medium" }}
          >
            Chapter Quiz
          </Text>
        </View>
        <View
          className="flex flex-col h-full"
          style={{ paddingHorizontal: 20 }}
        >
          <Text
            className="text-white font-semibold leading-[22px]"
            style={{ marginBottom: 26, fontFamily: "GeistMono-SemiBold" }}
          >
            {question}
          </Text>
          <View className="flex flex-col" style={{ gap: 20 }}>
            {options.map((option, i) => (
              <QuizAnswer
                key={option.ans}
                state={option.state}
                text={option.ans}
                enumerator={enumerator[i]}
              />
            ))}
          </View>
          <CustomButton
            text={btnText}
            style={{ marginTop: 122 }}
            handlePress={() => setFinish(true)}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const enumerator: { [key: number]: "A" | "B" | "C" | "D" } = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
};
