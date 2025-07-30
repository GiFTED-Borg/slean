import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const RightArrowIcon = ({
  width = 29,
  height = 25,
  stroke = "white",
}: Props) => (
  <Svg width={width} height={height} viewBox="0 0 29 25" fill="none">
    <Path
      d="M15.6862 5.5L23.5293 12.5M23.5293 12.5L15.6862 19.5M23.5293 12.5L4.70581 12.5"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RightArrowIcon;
