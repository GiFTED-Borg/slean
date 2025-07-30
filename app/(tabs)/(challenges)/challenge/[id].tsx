import ChevronRight from "@/assets/icons/chevron-right";
import { ScrollView, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import TimeIcon from "@/assets/icons/time-icon";
import Chip from "@/components/chip";
import PlayIcon from "@/assets/icons/play-icon";
import CustomButton from "@/components/custom-button";

export default function Challenge() {
  const router = useRouter();
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
            Build a function that transfers SPL tokens between accounts safely
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
          <Text
            className="text-white text-sm font-medium"
            style={{ marginBottom: 25, fontFamily: "GeistMono-Medium" }}
          >
            Instructions
          </Text>
          <View className="flex flex-col" style={{ gap: 2, marginBottom: 28 }}>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              1. Takes sender and receiver account addresses
            </Text>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              2. Takes the amount to transfer
            </Text>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              3. Validates the sender has sufficient balance
            </Text>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              4. Performs the transfer using Solana’s token program
            </Text>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              5. Returns a success/error result
            </Text>
          </View>
          <View className="flex flex-col" style={{ gap: 2, marginBottom: 31 }}>
            <Text
              className="text-xs"
              style={{ color: "#FFFFFFBF", fontFamily: "GeistMono-Regular" }}
            >
              Requirements
            </Text>
            <Text
              className="text-xs"
              style={{
                color: "#FFFFFFBF",
                paddingLeft: 5,
                fontFamily: "GeistMono-Regular",
              }}
            >
              • Use proper error handling
            </Text>
            <Text
              className="text-xs"
              style={{
                color: "#FFFFFFBF",
                paddingLeft: 5,
                fontFamily: "GeistMono-Regular",
              }}
            >
              • Validate input parameters
            </Text>
            <Text
              className="text-xs"
              style={{
                color: "#FFFFFFBF",
                paddingLeft: 5,
                fontFamily: "GeistMono-Regular",
              }}
            >
              • Include appropriate comments
            </Text>
          </View>
          <CustomButton
            handlePress={() => router.push("/code-challenge/1")}
            text="Start Challenge"
            endIcon={<PlayIcon fill="#292D32" />}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
