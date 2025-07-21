import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const ChallengeIcon = ({
  width = 18,
  height = 11,
  stroke = "#292D32",
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 18 11" fill="none">
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17 1 9.533 8.467 6.69 4.2 1 9.889"
    />
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.444 1H17v3.556"
    />
  </Svg>
);

export default ChallengeIcon;
