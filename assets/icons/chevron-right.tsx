import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const ChevronRight = ({
  width = 16,
  height = 16,
  stroke = "#292D32",
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="m5.94 13.28 4.347-4.347a1.324 1.324 0 0 0 0-1.866L5.94 2.72"
    />
  </Svg>
);

export default ChevronRight;
