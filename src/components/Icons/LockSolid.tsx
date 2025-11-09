import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LockSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const LockSolid = (props: LockSolidProps) => {
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
      fillRule="evenodd"
      d="M12 2a6 6 0 0 0-6 6v2.15a3.4 3.4 0 0 0-.816.286 4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C3 14.29 3 14.954 3 15.758v.483c0 .805 0 1.47.044 2.01.046.563.145 1.08.392 1.565a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 22 7.954 22 8.758 22h6.483c.805 0 1.47 0 2.01-.044.563-.046 1.08-.145 1.565-.392a4 4 0 0 0 1.748-1.748c.247-.485.346-1.002.392-1.564.044-.541.044-1.206.044-2.01v-.483c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748A3.4 3.4 0 0 0 18 10.15V8a6 6 0 0 0-6-6m4 8.002V8a4 4 0 0 0-8 0v2.002q.356-.003.759-.002h6.482q.403 0 .759.002"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default LockSolid;
