import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface DotsHorizontalOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const DotsHorizontalOutline = (props: DotsHorizontalOutlineProps) => {
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
      d="M3 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0m7 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0"
    />
  </Svg>
  );
};
export default DotsHorizontalOutline;
