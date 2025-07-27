import StreakIcon from "@/assets/icons/streak-icon";
import XPIcon from "@/assets/icons/xp-icon";
import { View, Text } from "react-native";

type ChipProps = {
  size: "lg" | "md" | "sm";
  text: string;
  variant: "green" | "violet" | "yellow" | "red" | "blue" | "blue2";
};

const chipStyles = {
  container: {
    lg: "rounded-[10px] py-[3px] px-2",
    md: "rounded-[8.73px] py-[2.62px] px-[6.98px]",
    sm: "rounded-[6.33px] py-[1.9px] px-[5.06px]",
  },
  text: {
    lg: "text-sm ",
    md: "text-[12.22px] leading-[17.2px]",
    sm: "text-[8.86px] leading-[12.47px]",
  },
};

const variantStyles = {
  container: {
    green: "bg-[#12201C]",
    violet: "bg-violet-900",
    yellow: "bg-[#1F1615]",
    red: "bg-red-900",
    blue: "bg-[#1B3E4A]",
    blue2: "bg-[#151E21]",
  },
  text: {
    green: "text-[#25F082]",
    violet: "text-violet-400",
    yellow: "text-[#F6A10F]",
    red: "text-red-100",
    blue: "text-[#00D4FF]",
    blue2: "text-[#19A6BA]",
  },
};

export default function Chip({ size, text, variant }: ChipProps) {
  return (
    <View
      className={`${chipStyles.container[size]} ${variantStyles.container[variant]}`}
    >
      <Text
        className={`${chipStyles.text[size]} ${variantStyles.text[variant]} font-semibold`}
        style={{ fontFamily: "GeistMono-SemiBold" }}
      >
        {text}
      </Text>
    </View>
  );
}

export function IconChip({
  type,
  text,
}: {
  type: "streak" | "xp";
  text: string;
}) {
  return (
    <View className="bg-[#1F1615] rounded-[4px] py-1 px-2.5 border-[0.25px] border-[#F6A10F] flex flex-row gap-1 items-center">
      {type === "streak" ? (
        <StreakIcon />
      ) : (
        <XPIcon width={10} height={14} stroke="#F6A10F" />
      )}
      <Text
        className="text-[11.53px] leading-[16.22px] text-[#F6A10F]"
        style={{ fontFamily: "GeistMono-Regular" }}
      >
        {text}
      </Text>
    </View>
  );
}
