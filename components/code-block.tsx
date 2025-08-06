import React from "react";
import { ScrollView, View, Text, TextInput, StyleSheet } from "react-native";

import { Token } from "@/hooks/queries/types";

export default function CodeBlock({
  inputValue,
  setInputValue,
  tokens,
}: {
  inputValue: string;
  setInputValue: (value: string) => void;
  tokens: Token[][];
}) {
  return (
    <ScrollView style={styles.container} horizontal>
      <View style={styles.codeContainer}>
        {tokens.map((line, i) => (
          <View key={i} style={styles.line}>
            {line.map((token, j) => {
              if (token.content.includes("{{INPUT}}")) {
                return (
                  <TextInput
                    key={j}
                    value={inputValue}
                    onChangeText={setInputValue}
                    style={styles.input}
                    placeholder="Type here..."
                    placeholderTextColor="#888"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect={false}
                  />
                );
              }
              return (
                <Text
                  key={j}
                  style={{
                    color: token.color,
                    fontFamily: "monospace",
                    lineHeight: 20,
                  }}
                >
                  {token.content}
                </Text>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    marginHorizontal: 20,
    borderRadius: 5,
  },
  codeContainer: { padding: 16 },
  line: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 2,
    alignItems: "center",
  },
  input: {
    // backgroundColor: "#2d2d2d",
    color: "#fff",
    fontFamily: "monospace",
    fontSize: 14,
    paddingHorizontal: 4,
    marginHorizontal: 2,
    borderRadius: 4,
    minWidth: 100,
    borderWidth: 1,
    borderColor: "#555",
    height: 25,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
