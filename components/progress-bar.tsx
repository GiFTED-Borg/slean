import * as Progress from "react-native-progress";

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <Progress.Bar
      progress={progress}
      animated
      color="#84E8E8"
      height={9}
      borderRadius={10}
    />
  );
}
