import { Image, View, Text } from "react-native";
import defaultImgIcon from "@/assets/images/defaultImgIcon.png";
import Chip from "./chip";

export default function ProfileCard() {
  return (
    <View className="rounded-[10px] bg-dark pt-3.5 pb-[9px] px-[1.625rem] flex flex-col">
      <View
        className="flex flex-row"
        style={{
          marginBottom: 4,
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#FFFFFF40",
        }}
      >
        <View
          className="rounded-full border border-cyan-600 size-[50px] items-center justify-center"
          style={{ marginRight: 12 }}
        >
          <Image
            source={defaultImgIcon}
            tintColor="#A6A6A6"
            className="size-5"
          />
        </View>
        <View className="flex flex-col">
          <Text
            className="text-white font-semibold text-base leading-[22px]"
            style={{ marginBottom: 2.5 }}
          >
            Kenpachi_Mazino
          </Text>
          <Text
            className="text-[10px] leading-[16.22px]"
            style={{ color: "#FFFFFF66", marginBottom: 3.85 }}
          >
            Rust Rookie
          </Text>
          <View className="flex flex-row items-center" style={{ gap: 8 }}>
            <Chip size="lg" text="Level 3" variant="violet" />
            <Text
              className="text-[10px] leading-[16.22px]"
              style={{ color: "#FFFFFF66" }}
            >
              Joined July 9 2025
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between w-full">
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text className="text-white font-semibold text-sm leading-[19.7px]">
            2
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99" }}
          >
            Lessons
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text className="text-white font-semibold text-sm leading-[19.7px]">
            2
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99" }}
          >
            Challenges
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text className="text-white font-semibold text-sm leading-[19.7px]">
            450
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99" }}
          >
            XP
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text className="text-white font-semibold text-sm leading-[19.7px]">
            7
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99" }}
          >
            Streak
          </Text>
        </View>
      </View>
    </View>
  );
}
