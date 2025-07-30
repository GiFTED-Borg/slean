import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// ✅ Define the props interface properly
interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const bgFade = useRef(new Animated.Value(0)).current;
  const textSlide = useRef(new Animated.Value(50)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1.4,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(rotateAnim, {
          toValue: 0,
          duration: 500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(bgFade, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true, // ✅ Changed to true since we're now animating the wrapper View
      }),
      Animated.parallel([
        Animated.timing(textSlide, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      setTimeout(onFinish, 1000);
    });
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "135deg"],
  });

  return (
    <View style={styles.root}>
      <View style={styles.absoluteFill}>
        <Animated.View
          style={[
            styles.darkBg,
            {
              opacity: bgFade.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            },
          ]}
        />
        {/* ✅ Wrap LinearGradient in Animated.View */}
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: bgFade }]}>
          <LinearGradient
            colors={["#84E8E8", "#26A8E9", "#4A8282"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
          />
        </Animated.View>
      </View>

      <View style={styles.centerRow}>
        <Animated.Image
          source={require("../assets/images/slean-logo.png")}
          style={[
            {
              width: 50,
              height: 50,
              transform: [{ rotate: rotation }, { scale: scaleAnim }],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: textOpacity,
              transform: [{ translateX: textSlide }],
            },
          ]}
        >
          Slean
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  darkBg: {
    backgroundColor: "#0B0C10",
    flex: 1,
  },
  centerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    fontSize: 28,
    fontWeight: "500",
    color: "#ffffff",
  },
});
