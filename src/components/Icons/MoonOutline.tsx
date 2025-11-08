import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface MoonOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const MoonOutline = (props: MoonOutlineProps) => {
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
      stroke="#0F172B"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 15.844a10.4 10.4 0 0 1-4.306.925c-5.779 0-10.463-4.684-10.463-10.462 0-1.536.33-2.994.925-4.307A10.46 10.46 0 0 0 2 11.538C2 17.316 6.684 22 12.462 22c4.243 0 7.896-2.526 9.538-6.156"
    />
  </Svg>
  );
};
export default MoonOutline;
