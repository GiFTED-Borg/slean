import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Image,
} from "react-native";

import { Toast } from "@/components/toast";
import { dynamicClient } from "@/clients/dynamic";
import googleIcon from "@/assets/images/google-icon.png";
import xIcon from "@/assets/images/x-icon.png";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });
  const router = useRouter();

  const handleGetOTP = async () => {
    if (!email.trim()) {
      setToast({
        visible: true,
        message: "Please enter your email address",
        type: "error",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        visible: true,
        message: "Please enter a valid email address",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await dynamicClient.auth.email.sendOTP(email);

      setToast({
        visible: true,
        message: `OTP sent to ${email}`,
        type: "success",
      });

      // Navigate to verification screen after a short delay
      setTimeout(() => {
        router.push({
          pathname: "/verify-otp",
          params: { email },
        });
      }, 1500);
    } catch (error) {
      setToast({
        visible: true,
        message: "Failed to send OTP. Please try again.",
        type: "error",
      });
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Sign In" }} />
      <View
        className="h-full flex flex-col flex-1"
        style={{
          backgroundColor: "#0B0C10",
          paddingHorizontal: 20,
          paddingTop: 54,
        }}
      >
        <View className="flex flex-col flex-1">
          <Text
            className="text-white text-xl font-medium"
            style={{
              marginTop: 54,
              marginBottom: 19,
              fontFamily: "GeistMono-Medium",
            }}
          >
            What is your email address?
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter email address"
            placeholderTextColor="#84E8E880"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleGetOTP}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Sending..." : "Continue"}
            </Text>
          </TouchableOpacity>
          <Toast
            visible={toast.visible}
            message={toast.message}
            type={toast.type}
            onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
          />
        </View>
        <View className="flex flex-col flex-1" style={{ gap: 40 }}>
          <View
            className="flex flex-row items-center justify-center"
            style={{ gap: 3 }}
          >
            <View
              style={{
                width: Dimensions.get("window").width / 2 - 24,
                height: 1,
                backgroundColor: "#FFFFFF99",
              }}
            ></View>
            <Text
              style={{
                color: "#FFFFFF99",
                fontSize: 12,
                fontFamily: "GeistMono-Regular",
              }}
            >
              or
            </Text>
            <View
              style={{
                width: Dimensions.get("window").width / 2 - 24,
                height: 1,
                backgroundColor: "#FFFFFF99",
              }}
            ></View>
          </View>
          <View
            className="flex flex-row items-center justify-center"
            style={{ gap: 52 }}
          >
            <TouchableOpacity
              className="flex flex-row items-center justify-center"
              style={{
                backgroundColor: "#27282C",
                width: 64,
                height: 64,
                borderRadius: 6.03,
              }}
            >
              <Image source={googleIcon} className="size-[42.57px]" />
            </TouchableOpacity>
            <TouchableOpacity
              className="flex flex-row items-center justify-center"
              style={{
                backgroundColor: "#27282C",
                width: 64,
                height: 64,
                borderRadius: 6.03,
              }}
            >
              <Image source={xIcon} className="size-[39.56px]" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 40,
    fontSize: 28,
    fontWeight: "bold",
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#132224",
    borderRadius: 20,
    paddingLeft: 27,
    paddingRight: 19,
    paddingHorizontal: 19,
    marginBottom: 46,
    height: 58,
    fontFamily: "GeistMono-Regular",
    color: "#84E8E8",
  },
  button: {
    backgroundColor: "#84E8E8",
    height: 58,
    padding: 19,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "GeistMono-Regular",
  },
  backLink: {
    marginTop: 20,
  },
});
