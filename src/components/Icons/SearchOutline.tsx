import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SearchOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const SearchOutline = (props: SearchOutlineProps) => {
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
      d="M11 2a9 9 0 1 0 5.618 16.032l3.675 3.675a1 1 0 0 0 1.414-1.414l-3.675-3.675A9 9 0 0 0 11 2m-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default SearchOutline;
