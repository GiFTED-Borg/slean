import { Theme } from "@react-navigation/native";
import { Platform } from "react-native";

const fonts = Platform.select({
  web: {
    regular: {
      fontFamily: "GeistMono-Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "GeistMono-Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "GeistMono-Bold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "GeistMono-ExtraBold",
      fontWeight: "700",
    },
  },
  ios: {
    regular: {
      fontFamily: "GeistMono-Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "GeistMono-Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "GeistMono-Bold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "GeistMono-ExtraBold",
      fontWeight: "700",
    },
  },
  default: {
    regular: {
      fontFamily: "GeistMono-Regular",
      fontWeight: "400",
    },
    medium: {
      fontFamily: "GeistMono-Medium",
      fontWeight: "500",
    },
    bold: {
      fontFamily: "GeistMono-Bold",
      fontWeight: "600",
    },
    heavy: {
      fontFamily: "GeistMono-ExtraBold",
      fontWeight: "700",
    },
  },
} as const satisfies Record<string, Theme["fonts"]>);

export const CustomTheme = {
  dark: false,
  colors: {
    primary: "rgba(255, 255, 255, 1)",
    background: "rgba(11, 12, 16, 1)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)",
  },
  fonts,
};
