import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface CheckOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const CheckOutline = (props: CheckOutlineProps) => {
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
      d="M20.707 5.293a1 1 0 0 1 0 1.414l-11 11a1 1 0 0 1-1.414 0l-5-5a1 1 0 1 1 1.414-1.414L9 15.586 19.293 5.293a1 1 0 0 1 1.414 0"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default CheckOutline;
