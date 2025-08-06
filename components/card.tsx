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
    <View
      style={{
        gap,
        borderWidth: 0.5,
        borderColor: shadow === "solid-gold" ? "#EE7D2D" : "#EE7D2D00",
        borderRadius: 20,
        backgroundColor: "#0F1014",
        boxShadow:
          shadow === "gold"
            ? `inset 1.5px 1.5px 1.5px 0 #9A60131A, inset -1.5px -1.5px 1.5px 0 #9A601333`
            : `inset 1.5px 1.5px 1.5px 0 #FFFFFF1A, inset -1.5px -1.5px 1.5px 0 #FFFFFF33`,
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
        <View style={{ paddingBottom: 10 }}>
          <Text
            style={{
              color: descColor,
              fontFamily: "GeistMono-Regular",
              fontSize: 12,
            }}
          >
            {desc}
          </Text>
        </View>
      )}
      {footer}
    </View>
  );
}
