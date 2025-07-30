import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
const EditIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.44}
      strokeWidth={1.125}
      d="M8.25 1.5h-1.5C3 1.5 1.5 3 1.5 6.75v4.5C1.5 15 3 16.5 6.75 16.5h4.5c3.75 0 5.25-1.5 5.25-5.25v-1.5"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeOpacity={0.44}
      strokeWidth={1.125}
      d="m12.03 2.265-5.91 5.91c-.225.225-.45.668-.495.99l-.322 2.258c-.12.817.457 1.387 1.275 1.274l2.257-.322c.315-.045.758-.27.99-.495l5.91-5.91c1.02-1.02 1.5-2.205 0-3.705s-2.685-1.02-3.705 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeOpacity={0.44}
      strokeWidth={1.125}
      d="M11.183 3.112a5.358 5.358 0 0 0 3.705 3.705"
    />
  </Svg>
);
export default EditIcon;
