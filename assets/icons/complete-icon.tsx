import * as React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const CompleteIcon = ({ width = 21, height = 20, fill = "#292D32" }: Props) => (
  <Svg width={width} height={height} viewBox="0 0 21 20" fill="none">
    <Path
      fill={fill}
      d="M10.073 0c-5.522 0-10 4.477-10 10s4.478 10 10 10c5.524 0 10-4.477 10-10s-4.476-10-10-10Zm0 18.77c-4.824 0-8.75-3.945-8.75-8.77 0-4.825 3.926-8.75 8.75-8.75 4.825 0 8.75 3.925 8.75 8.75s-3.925 8.77-8.75 8.77Zm3.991-12.43-5.867 5.905-2.642-2.642a.625.625 0 0 0-.884.884l3.093 3.093a.626.626 0 0 0 .959-.09l6.226-6.265a.626.626 0 0 0-.885-.884Z"
    />
  </Svg>
);

export default CompleteIcon;
