import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronLeftOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ChevronLeftOutline = (props: ChevronLeftOutlineProps) => {
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
      d="M15.707 5.293a1 1 0 0 1 0 1.414L10.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414l-6-6a1 1 0 0 1 0-1.414l6-6a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default ChevronLeftOutline;
