import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface CheckCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const CheckCircleSolid = (props: CheckCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m5.207 8.707a1 1 0 0 0-1.414-1.414L10.5 13.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default CheckCircleSolid;
