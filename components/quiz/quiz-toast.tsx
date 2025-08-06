import { View, Text } from "react-native";

export default function QuizToast({
  status,
  text,
}: {
  status: "correct" | "wrong";
  text: string;
}) {
  return (
    <View
      className="p-5 rounded-[10px] w-full"
      style={{
        borderWidth: 1,
        borderColor: status === "correct" ? "#A7FFFF" : "#F9545480",
        backgroundColor: status === "correct" ? "#1A3838" : "#67000080",
      }}
    >
      <Text
        className="text-white text-base leading-[22px]"
        style={{ fontFamily: "GeistMono-Regular", fontSize: 16 }}
      >
        {text}
      </Text>
    </View>
  );
}
