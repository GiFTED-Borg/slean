import ChallengeIcon from "@/assets/icons/challenge-icon";
import CoursesIcon from "@/assets/icons/courses-icon";
import XPIcon from "@/assets/icons/xp-icon";
import { View, Text } from "react-native";

type StatCardProps = {
  type: "xp" | "lessons" | "challenge";
  stat: number;
  text: string;
};

export default function StatCard({ type, stat, text }: StatCardProps) {
  return (
    <View className="border border-[#FFFFFF]/40 rounded-[10px] shadow-inner-white bg-white/10 py-[9px] flex-1 flex flex-col gap-y-1 items-center text-center">
      <View
        className={`border-[0.25px] size-7 rounded-full flex items-center justify-center ${type === "xp" ? "border-white bg-[#FFFFFF1A]" : type === "lessons" ? "bg-[#12201C] border-[#24E37C]" : "bg-[#3E1562] border-[#A95CEE]"}`}
      >
        {type === "xp" ? (
          <XPIcon width={13.07} height={17.82} stroke="#ffffff" />
        ) : type === "lessons" ? (
          <CoursesIcon width={14} height={14} fill="#24E37C" />
        ) : (
          <ChallengeIcon width={14.8} height={8.22} stroke="#A95CEE" />
        )}
      </View>
      <Text
        className="font-semibold text-base text-white"
        style={{ fontFamily: "GeistMono-SemiBold", fontSize: 16 }}
      >
        {stat}
      </Text>
      <Text
        className="font-light text-xs text-[#FFFFFF99]"
        style={{ fontFamily: "GeistMono-Light", fontSize: 12 }}
      >
        {text}
      </Text>
    </View>
  );
}
