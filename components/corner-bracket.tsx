import React from "react";
import { View, Text, StyleSheet, TextStyle, ViewStyle } from "react-native";

interface CornerBracketProps {
  text: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  cornerSize?: number;
  cornerThickness?: number;
  cornerColor?: string;
  backgroundColor?: string;
}

export default function CornerBracket({
  text,
  textStyle,
  containerStyle,
  cornerSize = 8,
  cornerThickness = 4,
  cornerColor = "#ffffff",
  backgroundColor = "#1a1a1a",
}: CornerBracketProps) {
  const cornerStyle = {
    width: cornerSize,
    height: cornerSize,
    borderColor: cornerColor,
    borderWidth: cornerThickness,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Top Left Corner */}
      <View
        style={[
          styles.corner,
          styles.topLeft,
          cornerStyle,
          {
            borderRightWidth: 0,
            borderBottomWidth: 0,
          },
        ]}
      />

      {/* Top Right Corner */}
      <View
        style={[
          styles.corner,
          styles.topRight,
          cornerStyle,
          {
            borderLeftWidth: 0,
            borderBottomWidth: 0,
          },
        ]}
      />

      {/* Bottom Left Corner */}
      <View
        style={[
          styles.corner,
          styles.bottomLeft,
          cornerStyle,
          {
            borderRightWidth: 0,
            borderTopWidth: 0,
          },
        ]}
      />

      {/* Bottom Right Corner */}
      <View
        style={[
          styles.corner,
          styles.bottomRight,
          cornerStyle,
          {
            borderLeftWidth: 0,
            borderTopWidth: 0,
          },
        ]}
      />

      <Text style={[styles.text, textStyle]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  corner: {
    position: "absolute",
  },
  topLeft: {
    top: 0,
    left: 0,
  },
  topRight: {
    top: 0,
    right: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
  },
  text: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    fontFamily: "Orbitron-Medium",
  },
});
