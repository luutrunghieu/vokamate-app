import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LockUnlockedSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const LockUnlockedSolid = (props: LockUnlockedSolidProps) => {
  const { width = 24, height = 24, ...restProps } = props;

  return (
  <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...restProps}
    >
    <Path
      fill={props.color || "#0F172B"}
      d="M6 8a6 6 0 0 1 11.88-1.199 1 1 0 1 1-1.96.398A4.002 4.002 0 0 0 8 8v2.002q.356-.003.759-.002h6.482c.805 0 1.47 0 2.01.044.563.046 1.08.145 1.565.392a4 4 0 0 1 1.748 1.748c.247.485.346 1.002.392 1.564.044.541.044 1.206.044 2.01v.483c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H8.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C3 17.71 3 17.046 3 16.242v-.483c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.262-.134.533-.224.816-.286z"
    />
  </Svg>
  );
};
export default LockUnlockedSolid;
