import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ArrowRightOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ArrowRightOutline = (props: ArrowRightOutlineProps) => {
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
      d="M12.707 4.293a1 1 0 1 0-1.414 1.414L16.586 11H5a1 1 0 1 0 0 2h11.586l-5.293 5.293a1 1 0 0 0 1.414 1.414l7-7a1 1 0 0 0 0-1.414z"
    />
  </Svg>
  );
};
export default ArrowRightOutline;
