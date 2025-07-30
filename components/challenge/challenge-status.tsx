import CancelIcon from "@/assets/icons/cancel-icon";
import ChallengeSuccess from "@/assets/icons/challenge-success";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChallengeStatusProps = {
  status: "success" | "error";
  xpAmount?: number;
  handlePress?: () => void;
  messages: string[];
};

export default function ChallengeStatus({
  status,
  xpAmount = 70,
  handlePress = () => {},
  messages,
}: ChallengeStatusProps) {
  return (
    <SafeAreaView className="flex-1 bg-black">
      <View
        className="flex-1 h-full"
        style={{
          backgroundColor: "#0B0C10",
          paddingHorizontal: 20,
          paddingBottom: 10,
          paddingTop: 71,
          minHeight: "100%",
        }}
      >
        <View className="flex flex-col items-center h-full">
          <View
            className="flex items-center justify-center rounded-[10px]"
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderColor: status === "success" ? "transparent" : "#670000",
              backgroundColor:
                status === "success" ? "transparent" : "#43050699",
              marginBottom: 30,
            }}
          >
            {status === "success" ? <ChallengeSuccess /> : <CancelIcon />}
          </View>
          <View className="flex flex-col items-center" style={{ gap: 7 }}>
            <Text
              className="text-white text-lg font-semibold text-center"
              style={{ fontFamily: "GeistMono-SemiBold" }}
            >
              {status === "success"
                ? "Challenge Completed"
                : "Challenge Failed"}
            </Text>
            {status === "success" && (
              <Text
                className="font-semibold text-center"
                style={{ color: "#FFFFFF99", fontFamily: "GeistMono-SemiBold" }}
              >
                You have earned {xpAmount} XP
              </Text>
            )}
          </View>
          <Text
            className="text-center"
            style={{
              color: "#FFFFFF99",
              fontFamily: "GeistMono-Regular",
              marginTop: 22,
              marginBottom: 29,
            }}
          >
            {status === "error"
              ? "Code has been rejected by compiler, lorem ipsum dolor epsum juot"
              : ""}
          </Text>
          <View
            className="flex flex-col w-full"
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: status === "success" ? "#A7FFFF" : "#430506",
              backgroundColor: status === "success" ? "#1A383899" : "#43050699",
              paddingTop: 21,
              paddingHorizontal: 30,
              paddingBottom: 26.5,
              marginBottom: 94,
            }}
          >
            <Text
              className="font-semibold"
              style={{
                color: status === "success" ? "#FCFF6699" : "#FF66AA99",
                fontFamily: "GeistMono-SemiBold",
                marginBottom: 14.85,
              }}
            >
              {status === "success" ? "Your Work was Astute" : "ERROR_LOG.txt"}
            </Text>
            <View
              className="flex flex-col"
              style={{ gap: 6.6, marginBottom: 40.73 }}
            >
              {messages.map((message) => (
                <View key={message} className="flex flex-row items-center">
                  <Text style={{ color: "#FFFFFF99" }}>•</Text>
                  <Text
                    style={{
                      color: "#FFFFFF99",
                      fontFamily: "GeistMono-Regular",
                    }}
                  >
                    {" "}
                    {message}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={{
                color: "#D97B00",
                fontFamily: "GeistMono-Regular",
              }}
            >
              Hint: Lorem ipsum dolor
            </Text>
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
              {status === "success" ? "Next Challenge" : "Retry Mission"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
