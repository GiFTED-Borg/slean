import {
  TouchableOpacity,
  Text,
  View,
  ViewStyle,
  StyleProp,
} from "react-native";

type CustomButtonProps = {
  isDisabled?: boolean;
  handlePress?: () => void;
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "outline" | "contained";
  style?: StyleProp<ViewStyle>;
};

export default function CustomButton({
  isDisabled = false,
  handlePress,
  text,
  startIcon,
  endIcon,
  variant = "contained",
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="rounded-[10px] w-full py-[9px] items-center"
      disabled={isDisabled}
      style={[
        {
          backgroundColor:
            variant === "contained"
              ? isDisabled
                ? "#84E8E873"
                : "#84E8E8"
              : "transparent",
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: variant === "outline" ? "#84E8E8" : "transparent",
          boxShadow: `-1px -1px 8px 0 #FFFFFF73, 1px 1px 8px 0 #FFFFFF73`,
        },
        style,
      ]}
    >
      <View className="flex flex-row items-center" style={{ gap: 10 }}>
        {startIcon && startIcon}
        <Text
          style={{
            fontFamily: "GeistMono-Regular",
            color: variant === "outline" ? "#84E8E8" : "#000000",
          }}
        >
          {text}
        </Text>
        {endIcon && endIcon}
      </View>
    </TouchableOpacity>
  );
}
