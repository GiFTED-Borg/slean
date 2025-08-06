import { View, Text, TouchableOpacity } from "react-native";

const styles = {
  container: {
    default: {
      backgroundColor: "transparent",
      borderColor: "#313131",
    },
    selected: {
      backgroundColor: "transparent",
      borderColor: "#84E8E8",
    },
    correct: {
      backgroundColor: "#3D6B6B",
      borderColor: "#84E8E8",
    },
    wrong: {
      backgroundColor: "#670000",
      borderColor: "#F95454",
    },
  },
};

export default function QuizAnswer({
  state,
  text,
  enumerator,
  onPress,
}: {
  state: "default" | "selected" | "correct" | "wrong";
  text: string;
  enumerator: "A" | "B" | "C" | "D";
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      className="rounded py-2.5 px-3.5 border flex flex-row items-center"
      style={{ gap: 15, ...styles.container[state] }}
      onPress={onPress}
    >
      <View className="rounded-[3px] flex flex-row items-center justify-center size-[30px] bg-[#313131]">
        <Text
          className="text-white text-base leading-[22px] font-semibold"
          style={{ fontFamily: "GeistMono-SemiBold", fontSize: 16 }}
        >
          {enumerator}
        </Text>
      </View>
      <Text
        className="text-white text-base leading-[22px]"
        style={{ fontFamily: "GeistMono-Regular", fontSize: 16 }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
}
