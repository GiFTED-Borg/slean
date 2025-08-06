import React, { JSX, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
  StyleProp,
} from "react-native";

// Types
interface CodeLine {
  text: string;
  hasBlank: boolean;
  blanks?: string[];
}

interface CodeTemplate {
  lines: CodeLine[];
}

interface UserAnswers {
  [key: string]: string;
}

interface StylesType {
  container: ViewStyle;
  header: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
  editorContainer: ViewStyle;
  codeEditor: ViewStyle;
  lineContainer: ViewStyle;
  lineNumber: TextStyle;
  lineContent: ViewStyle;
  codeLine: TextStyle;
  codeText: TextStyle;
  input: TextStyle;
  inputCorrect: TextStyle;
  inputIncorrect: TextStyle;
  buttonContainer: ViewStyle;
  button: ViewStyle;
  resetButton: ViewStyle;
  buttonText: TextStyle;
  resetButtonText: TextStyle;
  legend: ViewStyle;
  legendItem: ViewStyle;
  legendColor: ViewStyle;
  legendText: TextStyle;
  progressBar: ViewStyle;
  progressFill: ViewStyle;
  progressText: TextStyle;
}

const ExpandableCodeblock: React.FC = () => {
  // Define the code template with blanks marked as {{answer}}
  const codeTemplate: CodeTemplate = {
    lines: [
      { text: "fn main() {", hasBlank: false },
      { text: '    println!("Welcome to Slean IDE!");', hasBlank: false },
      { text: '    let name = "Solana Learner"', hasBlank: false },
      {
        text: '    println!("Hello, {{answer}}! You\'re {{answer}} years old");',
        hasBlank: true,
        blanks: ["name", "25"],
      },
      { text: "    // Simple loop", hasBlank: false },
      {
        text: "    for i in 1..={{answer}} {",
        hasBlank: true,
        blanks: ["5"],
      },
      { text: '        println!("Step {}", i);', hasBlank: false },
      { text: "    }", hasBlank: false },
      { text: "    // Function call", hasBlank: false },
      {
        text: "    {{answer}}(name)",
        hasBlank: true,
        blanks: ["greet_user"],
      },
      { text: "}", hasBlank: false },
      { text: "", hasBlank: false },
      {
        text: "fn {{answer}}(name: &str) {",
        hasBlank: true,
        blanks: ["greet_user"],
      },
      {
        text: '    println!("Keep building", {{answer}}! 🚀");',
        hasBlank: true,
        blanks: ["{}"],
      },
      { text: "}", hasBlank: false },
    ],
  };

  // State with proper typing
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  // Handle input change for blanks
  const handleInputChange = (
    lineIndex: number,
    blankIndex: number,
    value: string
  ): void => {
    const key = `${lineIndex}-${blankIndex}`;
    setUserAnswers((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Check if answer is correct
  const isAnswerCorrect = (
    lineIndex: number,
    blankIndex: number,
    userAnswer?: string
  ): boolean => {
    if (!userAnswer || !codeTemplate.lines[lineIndex].blanks) return false;
    const correctAnswer = codeTemplate.lines[lineIndex].blanks![blankIndex];
    return userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase();
  };

  // Get input style based on correctness
  const getInputStyle = (
    lineIndex: number,
    blankIndex: number,
    userAnswer?: string
  ): StyleProp<TextStyle> => {
    if (!showResults || !userAnswer) return styles.input;

    return isAnswerCorrect(lineIndex, blankIndex, userAnswer)
      ? [styles.input, styles.inputCorrect]
      : [styles.input, styles.inputIncorrect];
  };

  // Check all answers
  const checkAnswers = (): void => {
    setShowResults(true);
    let correctCount = 0;
    let totalBlanks = 0;

    codeTemplate.lines.forEach((line, lineIndex) => {
      if (line.hasBlank && line.blanks) {
        line.blanks.forEach((_, blankIndex) => {
          totalBlanks++;
          const key = `${lineIndex}-${blankIndex}`;
          if (isAnswerCorrect(lineIndex, blankIndex, userAnswers[key])) {
            correctCount++;
          }
        });
      }
    });

    Alert.alert(
      "Results",
      `You got ${correctCount} out of ${totalBlanks} answers correct!`,
      [{ text: "OK" }]
    );
  };

  // Reset all answers
  const resetAnswers = (): void => {
    setUserAnswers({});
    setShowResults(false);
  };

  // Calculate completion percentage
  const getCompletionPercentage = (): number => {
    let filledBlanks = 0;
    let totalBlanks = 0;

    codeTemplate.lines.forEach((line, lineIndex) => {
      if (line.hasBlank && line.blanks) {
        line.blanks.forEach((_, blankIndex) => {
          totalBlanks++;
          const key = `${lineIndex}-${blankIndex}`;
          if (userAnswers[key] && userAnswers[key].trim() !== "") {
            filledBlanks++;
          }
        });
      }
    });

    return totalBlanks > 0 ? (filledBlanks / totalBlanks) * 100 : 0;
  };

  // Render a line with potential blanks
  const renderCodeLine = (line: CodeLine, lineIndex: number): JSX.Element => {
    if (!line.hasBlank) {
      return (
        <View key={lineIndex} style={styles.lineContainer}>
          <Text style={styles.lineNumber}>{lineIndex + 1} </Text>
          <Text style={styles.codeText}>{line.text}</Text>
        </View>
      );
    }

    // Split the line by {{answer}} and insert inputs
    const parts = line.text.split("{{answer}}");
    const elements: JSX.Element[] = [];

    parts.forEach((part, partIndex) => {
      if (part) {
        elements.push(
          <Text key={`text-${partIndex}`} style={styles.codeText}>
            {part}
          </Text>
        );
      }

      if (
        partIndex < parts.length - 1 &&
        line.blanks &&
        line.blanks[partIndex] !== undefined
      ) {
        const key = `${lineIndex}-${partIndex}`;
        const userAnswer = userAnswers[key] || "";

        elements.push(
          <TextInput
            key={`input-${partIndex}`}
            style={getInputStyle(lineIndex, partIndex, userAnswer)}
            value={userAnswer}
            onChangeText={(value: string) =>
              handleInputChange(lineIndex, partIndex, value)
            }
            placeholder="?"
            placeholderTextColor="#666"
            autoCapitalize="none"
            autoCorrect={false}
            spellCheck={false}
            multiline={false}
            textAlign="center"
          />
        );
      }
    });

    return (
      <View key={lineIndex} style={styles.lineContainer}>
        <Text style={styles.lineNumber}>{lineIndex + 1} </Text>
        <View style={styles.lineContent}>{elements}</View>
      </View>
    );
  };

  const completionPercentage = getCompletionPercentage();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Complete the Rust Code</Text>
        <Text style={styles.subtitle}>
          Fill in the blanks to make the code work correctly
        </Text>
        <View style={[styles.progressBar, { backgroundColor: "#374151" }]}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${completionPercentage}%`,
                backgroundColor: "#10b981",
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(completionPercentage)}% Complete
        </Text>
      </View>

      <ScrollView
        style={styles.editorContainer}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
      >
        <View style={styles.codeEditor}>
          {codeTemplate.lines.map((line, index) => renderCodeLine(line, index))}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={checkAnswers}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Check Answers</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={resetAnswers}
          activeOpacity={0.7}
        >
          <Text style={[styles.buttonText, styles.resetButtonText]}>Reset</Text>
        </TouchableOpacity>
      </View>

      {showResults && (
        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#10b981" }]}
            />
            <Text style={styles.legendText}>Correct</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#ef4444" }]}
            />
            <Text style={styles.legendText}>Incorrect</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create<StylesType>({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#a0aec0",
    textAlign: "center",
    marginBottom: 16,
  },
  progressBar: {
    width: "100%",
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: "#9ca3af",
    fontWeight: "600",
  },
  editorContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#334155",
  },
  codeEditor: {
    padding: 16,
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 28,
    marginBottom: 6,
  },
  lineNumber: {
    color: "#64748b",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    minWidth: 35,
    textAlign: "right",
    marginRight: 12,
  },
  lineContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    flex: 1,
  },
  codeLine: {
    color: "#e2e8f0",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 24,
  },
  codeText: {
    color: "#e2e8f0",
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    lineHeight: 24,
  },
  input: {
    backgroundColor: "#374151",
    borderWidth: 2,
    borderColor: "#4b5563",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 60,
    maxWidth: 120,
    fontSize: 14,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#ffffff",
    marginHorizontal: 2,
    textAlign: "center",
  },
  inputCorrect: {
    borderColor: "#10b981",
    backgroundColor: "#064e3b",
  },
  inputIncorrect: {
    borderColor: "#ef4444",
    backgroundColor: "#7f1d1d",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#667eea",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    minWidth: 130,
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#6b7280",
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  resetButtonText: {
    color: "#9ca3af",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendText: {
    color: "#9ca3af",
    fontSize: 14,
  },
  // progressBar: {
  //   width: "100%",
  //   height: 6,
  //   borderRadius: 3,
  //   marginBottom: 8,
  //   overflow: "hidden",
  // },
  // progressFill: {
  //   height: "100%",
  //   borderRadius: 3,
  // },
  // progressText: {
  //   fontSize: 14,
  //   color: "#9ca3af",
  //   fontWeight: "600",
  // },
});

export default ExpandableCodeblock;
