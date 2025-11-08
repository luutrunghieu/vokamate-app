import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronUpOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ChevronUpOutline = (props: ChevronUpOutlineProps) => {
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
      d="M11.293 8.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1-1.414 1.414L12 10.414l-5.293 5.293a1 1 0 0 1-1.414-1.414z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default ChevronUpOutline;
