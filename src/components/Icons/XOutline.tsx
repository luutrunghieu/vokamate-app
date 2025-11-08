import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface XOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const XOutline = (props: XOutlineProps) => {
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
      d="M16.293 6.293a1 1 0 1 1 1.414 1.414L13.414 12l4.293 4.293a1 1 0 1 1-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 1 1-1.414-1.414L10.586 12 6.293 7.707a1 1 0 1 1 1.414-1.414L12 10.586z"
    />
  </Svg>
  );
};
export default XOutline;
