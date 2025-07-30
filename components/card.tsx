import { View, Text } from "react-native";
import { Shadow } from "react-native-shadow-2";

type CardProps = {
  gap: number;
  headerExtraGap?: "sm" | "lg";
  title: string;
  desc?: string;
  info?: React.ReactNode;
  footer?: React.ReactNode;
  rightExtra: React.ReactNode;
  headerExtra?: React.ReactNode;
  shadow: "gold" | "silver" | "solid-gold";
  descColor?: string;
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
  descColor = "#ffffff",
}: CardProps) {
  return (
    <Shadow
      stretch
      distance={2}
      startColor={shadow === "gold" ? "#9A60131A" : "#FFFFFF1A"}
      endColor={shadow === "gold" ? "#9A601333" : "#FFFFFF33"}
      style={{
        borderRadius: 20,
      }}
      containerStyle={{
        borderRadius: 20,
        borderWidth: shadow === "solid-gold" ? 0.5 : 0,
        borderColor: shadow === "solid-gold" ? "#EE7D2D" : "none",
      }}
    >
      <View
        style={{
          gap,
        }}
        className={`flex flex-col py-3.5 px-[13px]`}
      >
        <View
          className="flex flex-col"
          style={{ gap: headerExtraGap && (headerExtraGap === "sm" ? 7 : 11) }}
        >
          <View className="flex flex-row items-center justify-between">
            <Text
              className="font-semibold text-white text-lg max-w-[192px]"
              style={{ fontFamily: "GeistMono-SemiBold" }}
            >
              {title}
            </Text>
            {rightExtra}
          </View>
          {headerExtra}
        </View>
        {info && info}
        {desc && (
          <View>
            <Text
              className="text-xs"
              style={{ color: descColor, fontFamily: "GeistMono-Regular" }}
            >
              {desc}
            </Text>
          </View>
        )}
        {footer}
      </View>
    </Shadow>
  );
}
