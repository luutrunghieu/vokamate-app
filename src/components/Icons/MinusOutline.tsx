import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface MinusOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const MinusOutline = (props: MinusOutlineProps) => {
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
      d="M4 12a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default MinusOutline;
