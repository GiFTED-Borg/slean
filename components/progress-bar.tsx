import * as Progress from "react-native-progress";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <Progress.Bar
      progress={progress}
      animated
      color="#84E8E8"
      height={9}
      width={320}
      borderRadius={10}
      unfilledColor="#161A1A"
      borderWidth={0}
    />
  );
}
