import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  stroke?: string;
};

const ShareIcon = ({ width = 16, height = 16, stroke = "#292D32" }: Props) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 16 16"
    stroke="none"
    fill="none"
  >
    <Path
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.96 5.933c2.4.207 3.38 1.44 3.38 4.14v.087c0 2.98-1.193 4.173-4.173 4.173h-4.34c-2.98 0-4.174-1.193-4.174-4.173v-.087c0-2.68.967-3.913 3.327-4.133M8 10V2.413M10.233 3.9 8 1.667 5.767 3.9"
    />
  </Svg>
);

export default ShareIcon;
