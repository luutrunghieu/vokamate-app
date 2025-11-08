import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface PlusOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const PlusOutline = (props: PlusOutlineProps) => {
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
      d="M13 5a1 1 0 1 0-2 0v6H5a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6z"
    />
  </Svg>
  );
};
export default PlusOutline;
