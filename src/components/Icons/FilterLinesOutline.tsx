import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface FilterLinesOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const FilterLinesOutline = (props: FilterLinesOutlineProps) => {
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
      d="M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M2 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1M8 18a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default FilterLinesOutline;
