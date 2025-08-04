import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useRef } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { Toast } from "@/components/toast";
import { dynamicClient } from "@/clients/dynamic";
import { useSession } from "@/contexts/SessionContext";
import { API_BASE_URL } from "@/constants/api";
import RightArrowIcon from "@/assets/icons/right-arrow";

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
  const { login } = useSession();

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
    if (e.nativeEvent.key === "Backspace" && index > 0) {
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
      const response = await dynamicClient.auth.email.verifyOTP(otpString);

      if (response) {
        const res = await fetch(`${API_BASE_URL}/auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            authToken: response.jwt,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (response.jwt && data?.user) {
          // Use the session handler to store the JWT from your backend
          await login(response.jwt);

          router.push("/");

          setToast({
            visible: true,
            message: "OTP verified successfully!",
            type: "success",
          });
        } else {
          throw new Error(data?.message || "Authentication failed");
        }
      }
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

      <View
        className="h-full flex flex-col flex-1"
        style={{ backgroundColor: "#0B0C10", paddingHorizontal: 20 }}
      >
        <View
          className="flex flex-row items-center justify-between"
          style={{ gap: 15, marginTop: 189, marginBottom: 108 }}
        >
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
          className="flex flex-row  items-center justify-center"
          style={{
            height: 87,
            width: "100%",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#A7FFFF80",
            marginBottom: 19,
            gap: 5,
          }}
          onPress={handleVerifyOTP}
          disabled={isLoading}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: "GeistMono-SemiBold",
              fontWeight: 600,
              color: isLoading ? "#FFFFFF99" : "#FFFFFF",
            }}
          >
            {isLoading ? "VERIFYING..." : "ENTER"}
          </Text>
          {!isLoading && <RightArrowIcon width={28} height={24} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendOTP} disabled={isLoading}>
          <Text style={{ color: "#84E8E8" }}>Resend OTP</Text>
        </TouchableOpacity>

        <Toast
          visible={toast.visible}
          message={toast.message}
          type={toast.type}
          onHide={() => setToast((prev) => ({ ...prev, visible: false }))}
        />
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
    flex: 1,
    height: 65,
    borderWidth: 1.5,
    borderColor: "#A7FFFF80",
    borderRadius: 5,
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "transparent",
    color: "#84E8E8",
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
