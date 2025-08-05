import * as Progress from "react-native-progress";

export default function ProgressBar({
  progress,
  width,
  color,
  unfilledColor = "#27282C",
}: {
  progress: number;
  color?: string;
  unfilledColor?: string;
  width?: number;
}) {
  return (
    <Progress.Bar
      progress={progress}
      animated
      color={color || "#84E8E8"}
      height={9}
      width={width || 320}
      borderRadius={10}
      unfilledColor={unfilledColor}
      borderWidth={0}
    />
  );
}
