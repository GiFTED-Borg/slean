import { View, Text } from "react-native";
import ProgressBar from "./progress-bar";

export default function SkillsLevelCard() {
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
      <Text className="text-white font-semibold text-base leading-[19.7px]">
        Skills
      </Text>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs leading-[19.7px] text-white">Rust</Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{ color: "#FFFFFF99" }}
          >
            Lvl 4
          </Text>
        </View>
        <ProgressBar progress={0.75} color="#FFAA2C" width={289} />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs leading-[19.7px] text-white">
            Solana Programs
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{ color: "#FFFFFF99" }}
          >
            Lvl 1
          </Text>
        </View>
        <ProgressBar progress={0.75} color="#FFAA2C" width={289} />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs leading-[19.7px] text-white">
            Anchor Framewok
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{ color: "#FFFFFF99" }}
          >
            Lvl 5
          </Text>
        </View>
        <ProgressBar progress={0.75} color="#FFAA2C" width={289} />
      </View>
      <View className="flex flex-col" style={{ gap: 4 }}>
        <View className="flex flex-row items-center justify-between">
          <Text className="text-xs leading-[19.7px] text-white">
            Token Standards
          </Text>
          <Text
            className="text-[8px] font-semibold leading-[8.72px]"
            style={{ color: "#FFFFFF99" }}
          >
            Lvl 2
          </Text>
        </View>
        <ProgressBar progress={0.75} color="#FFAA2C" width={289} />
      </View>
    </View>
  );
}
