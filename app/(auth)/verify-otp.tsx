import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Toast } from "@/components/toast";
import { dynamicClient } from "@/clients/dynamic";

export default function VerifyOTPScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
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
  const inputRefs = useRef<TextInput[]>([]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus to next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      setToast({
        visible: true,
        message: "Please enter the complete 6-digit OTP",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await dynamicClient.auth.email.verifyOTP(otpString);

      setToast({
        visible: true,
        message: "OTP verified successfully!",
        type: "success",
      });

      // Navigate to main app after a short delay
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (error) {
      setToast({
        visible: true,
        message: "Invalid OTP. Please try again.",
        type: "error",
      });
      console.log("OTP verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!email) {
      setToast({
        visible: true,
        message: "Email not found. Please go back to sign in.",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await dynamicClient.auth.email.sendOTP(email);
      setToast({
        visible: true,
        message: "OTP resent successfully!",
        type: "success",
      });
    } catch (error) {
      setToast({
        visible: true,
        message: "Failed to resend OTP. Please try again.",
        type: "error",
      });
      console.log("Resend OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Stack.Screen options={{ title: "Verify OTP" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Verify OTP
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Enter the 6-digit code sent to{"\n"}
          <ThemedText style={styles.email}>{email}</ThemedText>
        </ThemedText>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={digit}
              onChangeText={(text) => handleOtpChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="numeric"
              maxLength={1}
              textAlign="center"
              autoFocus={index === 0}
            />
          ))}
        </View>

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleVerifyOTP}
          disabled={isLoading}
        >
          <ThemedText style={styles.buttonText}>
            {isLoading ? "Verifying..." : "Verify OTP"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resendButton}
          onPress={handleResendOTP}
          disabled={isLoading}
        >
          <ThemedText style={styles.resendText}>Resend OTP</ThemedText>
        </TouchableOpacity>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
      </ThemedView>
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
    marginBottom: 20,
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  email: {
    fontWeight: "600",
    color: "#007AFF",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
    marginBottom: 40,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
    maxWidth: 300,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resendText: {
    color: "#007AFF",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
