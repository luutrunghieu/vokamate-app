import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowLeftOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ArrowLeftOutline = (props: ArrowLeftOutlineProps) => {
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
      d="M12.707 5.707a1 1 0 0 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L7.414 13H19a1 1 0 1 0 0-2H7.414z"
    />
  </Svg>
  );
};
export default ArrowLeftOutline;
