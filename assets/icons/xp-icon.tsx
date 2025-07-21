import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const XPIcon = ({ width = 18, height = 25, stroke = "#292D32" }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 18 25" fill="none">
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.699}
      d="M2.373 14.084h3.5v8.154c0 1.2 1.495 1.767 2.287.86l8.573-9.739c.748-.85.148-2.174-.985-2.174h-3.5V3.03c0-1.2-1.494-1.767-2.287-.861l-8.573 9.74c-.736.849-.136 2.174.985 2.174Z"
    />
  </Svg>
);

export default XPIcon;
