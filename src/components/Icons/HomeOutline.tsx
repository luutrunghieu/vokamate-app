import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const HomeOutline = (props: HomeOutlineProps) => {
  const { width = 24, height = 24, ...restProps } = props;

  return (
  <Svg
      width={width}
      height={height}
      fill="none"
      stroke={props.color || "#000"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      {...restProps}
    >
    <Path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
  );
};
export default HomeOutline;
