import { Image, View, Text, TouchableOpacity } from "react-native";
import defaultImgIcon from "@/assets/images/defaultImgIcon.png";
import Chip from "./chip";
import EditIcon from "@/assets/icons/edit-icon";

type ProfileCardProps = {
  name: string;
  profileImage: string;
  level: number;
  dateJoined: string;
  lessons: number;
  challenges: number;
  xp: number;
  streak: number;
};

export default function ProfileCard({
  name,
  profileImage,
  level,
  dateJoined,
  lessons,
  challenges,
  xp,
  streak,
}: ProfileCardProps) {
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
            source={defaultImgIcon || profileImage}
            tintColor="#A6A6A6"
            className="size-5"
          />
        </View>
        <View className="flex flex-col flex-1">
          <View className="flex flex-row items-center justify-between">
            <Text
              className="text-white font-semibold text-base leading-[22px]"
              style={{ marginBottom: 2.5, fontFamily: "GeistMono-SemiBold" }}
            >
              {name}
            </Text>
            <TouchableOpacity className="p-4">
              <EditIcon />
            </TouchableOpacity>
          </View>
          <Text
            className="text-[10px] leading-[16.22px]"
            style={{
              color: "#FFFFFF66",
              marginBottom: 3.85,
              fontFamily: "GeistMono-Regular",
            }}
          >
            Rust Rookie
          </Text>
          <View className="flex flex-row items-center" style={{ gap: 8 }}>
            <Chip size="lg" text={`Level ${level}`} variant="violet" />
            <Text
              className="text-[10px] leading-[16.22px]"
              style={{ color: "#FFFFFF66", fontFamily: "GeistMono-Regular" }}
            >
              Joined {dateJoined}
            </Text>
          </View>
        </View>
      </View>
      <View className="flex flex-row items-center justify-between w-full">
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text
            className="text-white font-semibold text-sm leading-[19.7px]"
            style={{ fontFamily: "GeistMono-SemiBold" }}
          >
            {lessons}
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99", fontFamily: "GeistMono-Regular" }}
          >
            Lessons
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text
            className="font-semibold text-sm leading-[19.7px]"
            style={{ fontFamily: "GeistMono-SemiBold", color: "#FFFFFF99" }}
          >
            {challenges}
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99", fontFamily: "GeistMono-Light" }}
          >
            Challenges
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text
            className="text-white font-semibold text-sm leading-[19.7px]"
            style={{ fontFamily: "GeistMono-SemiBold" }}
          >
            {xp}
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99", fontFamily: "GeistMono-Light" }}
          >
            XP
          </Text>
        </View>
        <View
          className="flex flex-col items-center justify-center"
          style={{ gap: 2 }}
        >
          <Text
            className="text-white font-semibold text-sm leading-[19.7px]"
            style={{ fontFamily: "GeistMono-SemiBold" }}
          >
            {streak}
          </Text>
          <Text
            className="text-xs font-light leading-[19.7px]"
            style={{ color: "#FFFFFF99", fontFamily: "GeistMono-Light" }}
          >
            Streak
          </Text>
        </View>
      </View>
    </View>
  );
}
