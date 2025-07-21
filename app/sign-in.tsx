import { Link, Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Toast } from "@/components/Toast";
import { dynamicClient } from "@/clients/dynamic";

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
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Sign In
        </ThemedText>

        <ThemedView style={styles.formContainer}>
          <ThemedText style={styles.label}>Email Address</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#666"
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
            <ThemedText style={styles.buttonText}>
              {isLoading ? "Sending..." : "Get OTP"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

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
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backLink: {
    marginTop: 20,
  },
});
