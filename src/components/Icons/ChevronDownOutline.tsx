import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ChevronDownOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ChevronDownOutline = (props: ChevronDownOutlineProps) => {
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
      d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default ChevronDownOutline;
