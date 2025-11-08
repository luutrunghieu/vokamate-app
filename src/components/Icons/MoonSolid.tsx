import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface MoonSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const MoonSolid = (props: MoonSolidProps) => {
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
      d="M9.067 2.412A1 1 0 0 0 7.744 1.09 11.46 11.46 0 0 0 1 11.538C1 17.868 6.132 23 12.462 23c4.65 0 8.652-2.769 10.45-6.744a1 1 0 0 0-1.324-1.323 9.4 9.4 0 0 1-3.895.836 9.46 9.46 0 0 1-9.462-9.462c0-1.39.3-2.708.836-3.895"
    />
  </Svg>
  );
};
export default MoonSolid;
