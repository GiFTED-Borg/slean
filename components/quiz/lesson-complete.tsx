import ChallengeSuccess from "@/assets/icons/challenge-success";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LessonCompleteProps = {
  xpAmount?: number;
  handlePress?: () => void;
};

export default function LessonComplete({
  xpAmount = 70,
  handlePress = () => {},
}: LessonCompleteProps) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View
        className="flex-1 h-full"
        style={{
          backgroundColor: "#0B0C10",
          paddingHorizontal: 20,
          paddingBottom: 10,
          minHeight: "100%",
        }}
      >
        <View className="flex flex-col items-center h-full">
          <View
            className="flex flex-col items-center justify-center"
            style={{ height: Dimensions.get("window").height - 124 }}
          >
            <ChallengeSuccess />
            <View
              className="flex flex-col items-center"
              style={{ gap: 7, marginTop: 22 }}
            >
              <Text
                className="text-white text-lg font-semibold text-center"
                style={{ fontFamily: "GeistMono-SemiBold" }}
              >
                Lesson Complete
              </Text>

              <Text
                className="font-semibold text-center"
                style={{
                  color: "#FFFFFF99",
                  fontFamily: "GeistMono-SemiBold",
                }}
              >
                You have earned {xpAmount} XP
              </Text>
            </View>
          </View>

          <TouchableOpacity
            className="rounded-[10px] w-full py-[9px] items-center"
            onPress={handlePress}
            style={{
              backgroundColor: "#84E8E8",
              boxShadow: `-1px -1px 5px 0 #FFFFFF73, 1px 1px 5px 0 #FFFFFF73`,
              marginTop: "auto",
            }}
          >
            <Text
              className="text-sm text-black"
              style={{ fontFamily: "GeistMono-Regular" }}
            >
              Next Chapter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
