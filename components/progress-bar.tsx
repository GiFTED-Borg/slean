import { View, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

export default function ProgressBar({
  progress,
  color,
  unfilledColor = "#27282C",
}: {
  progress: number;
  color?: string;
  unfilledColor?: string;
}) {
  return (
    <View style={styles.container}>
      <Progress.Bar
        progress={progress}
        animated
        color={color || "#84E8E8"}
        height={9}
        borderRadius={10}
        unfilledColor={unfilledColor}
        borderWidth={0}
        width={null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
