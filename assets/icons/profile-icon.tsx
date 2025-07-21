import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const ProfileIcon = ({ width = 16, height = 16, fill = "292D32" }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
    <Path
      fill={fill}
      d="M8 8.5a3.838 3.838 0 0 1-3.833-3.833A3.838 3.838 0 0 1 8 .833a3.838 3.838 0 0 1 3.833 3.834A3.838 3.838 0 0 1 8 8.5Zm0-6.667a2.84 2.84 0 0 0-2.833 2.834A2.84 2.84 0 0 0 8 7.5a2.84 2.84 0 0 0 2.833-2.833A2.84 2.84 0 0 0 8 1.833ZM13.727 15.167a.504.504 0 0 1-.5-.5c0-2.3-2.347-4.167-5.227-4.167-2.88 0-5.227 1.867-5.227 4.167 0 .273-.226.5-.5.5a.504.504 0 0 1-.5-.5C1.773 11.82 4.567 9.5 8 9.5c3.433 0 6.227 2.32 6.227 5.167 0 .273-.227.5-.5.5Z"
    />
  </Svg>
);

export default ProfileIcon;
