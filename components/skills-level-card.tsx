import { View, Text } from "react-native";
import ProgressBar from "./progress-bar";
import { mapProgress } from "@/utils/helpers";

type SkillsLevelCardProps = {
  lvl1: number;
  lvl2: number;
  lvl3: number;
  lvl4: number;
};

export default function SkillsLevelCard({
  lvl1,
  lvl2,
  lvl3,
  lvl4,
}: SkillsLevelCardProps) {
  function calcProgress(lvl: number): number {
    if (lvl <= 0) return 0;
    const clamped = Math.min(lvl, 5);
    return parseFloat((clamped / 5).toFixed(1));
  }

  return (
    <View
      className="rounded-[10px] pt-3 pb-6 px-6 flex flex-col"
      style={{
        backgroundColor: "#FFFFFF30",
        borderWidth: 1,
        borderColor: "#FFFFFF4D",
        gap: 8,
        boxShadow: `inset -2px -2px 4px 0 rgba(255, 255, 255, 0.1),
          inset -2px -2px 4px 0 rgba(255, 255, 255, 0.1)`,
      }}
    >
      <Text
        className="text-white font-semibold text-base leading-[19.7px]"
        style={{ fontFamily: "GeistMono-SemiBold", fontSize: 16 }}
      >
        Progress
      </Text>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-xs leading-[19.7px] text-white"
            style={{ fontFamily: "GeistMono-Regular", fontSize: 12 }}
          >
            Rust
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{
              color: "#FFFFFF99",
              fontFamily: "GeistMono-SemiBold",
              fontSize: 8,
            }}
          >
            Lvl {lvl1}
          </Text>
        </View>
        <ProgressBar
          progress={mapProgress(calcProgress(lvl1))}
          color="#FFAA2C"
          unfilledColor="#FFFFFFAB"
        />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-xs leading-[19.7px] text-white"
            style={{ fontFamily: "GeistMono-Regular", fontSize: 12 }}
          >
            Solana Programs
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{
              color: "#FFFFFF99",
              fontFamily: "GeistMono-SemiBold",
              fontSize: 8,
            }}
          >
            Lvl {lvl2}
          </Text>
        </View>
        <ProgressBar
          progress={mapProgress(calcProgress(lvl2))}
          color="#FFAA2C"
          unfilledColor="#FFFFFFAB"
        />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-xs leading-[19.7px] text-white"
            style={{ fontFamily: "GeistMono-Regular", fontSize: 12 }}
          >
            Anchor Framewok
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{
              color: "#FFFFFF99",
              fontFamily: "GeistMono-SemiBold",
              fontSize: 8,
            }}
          >
            Lvl {lvl3}
          </Text>
        </View>
        <ProgressBar
          progress={mapProgress(calcProgress(lvl3))}
          color="#FFAA2C"
          unfilledColor="#FFFFFFAB"
        />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text
            className="text-xs leading-[19.7px] text-white"
            style={{ fontFamily: "GeistMono-Regular", fontSize: 12 }}
          >
            Token Standards
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{
              color: "#FFFFFF99",
              fontFamily: "GeistMono-SemiBold",
              fontSize: 8,
            }}
          >
            Lvl {lvl4}
          </Text>
        </View>
        <ProgressBar
          progress={mapProgress(calcProgress(lvl4))}
          color="#FFAA2C"
          unfilledColor="#FFFFFFAB"
        />
      </View>
    </View>
  );
}
