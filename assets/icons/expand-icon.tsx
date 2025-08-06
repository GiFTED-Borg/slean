import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const ExpandIcon = ({ width = 16, height = 16, stroke = "#ffffff" }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9.39311 3.27027L4.4205 2.74762M4.4205 2.74762L3.89786 7.72023M4.4205 2.74762L9.68985 9.3345M19.183 15.3598L18.6833 20.3348L13.6878 19.8098M13.3204 13.7381L18.6604 20.3324"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ExpandIcon;
