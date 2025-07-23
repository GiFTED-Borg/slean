import { View, Text } from "react-native";

type CardProps = {
  gap: number;
  headerExtraGap?: "sm" | "lg";
  title: string;
  desc?: string;
  info?: React.ReactNode;
  footer?: React.ReactNode;
  rightExtra: React.ReactNode;
  headerExtra?: React.ReactNode;
  shadow: "gold" | "silver";
};

export default function Card({
  gap,
  title,
  info,
  desc,
  footer,
  shadow,
  rightExtra,
  headerExtraGap,
  headerExtra,
}: CardProps) {
  return (
    <View
      style={{
        gap,
        boxShadow:
          shadow === "gold"
            ? `inset 1px 1px 1px 0 rgba(154, 96, 19, 0.1),
          inset -1px -1px 1px 0 rgba(154, 96, 19, 0.2)`
            : `inset 1px 1px 0 rgba(255, 255, 255, 0.1), inset -1px -1px 1px 0 rgba(255, 255, 255, 0.2)`,
      }}
      className={`flex flex-col rounded-[1.25rem] py-3.5 px-[13px] ${shadow === "gold" ? "shadow-inner-gold-dual" : "shadow-inner-silver-dual"}`}
    >
      <View
        className="flex flex-col"
        style={{ gap: headerExtraGap && (headerExtraGap === "sm" ? 7 : 11) }}
      >
        <View className="flex flex-row items-center justify-between">
          <Text className="font-semibold text-white text-lg max-w-[192px]">
            {title}
          </Text>
          {rightExtra}
        </View>
        {headerExtra}
      </View>
      {info && info}
      {desc && (
        <View>
          <Text className="text-white text-xs">{desc}</Text>
        </View>
      )}
      {footer}
    </View>
  );
}
