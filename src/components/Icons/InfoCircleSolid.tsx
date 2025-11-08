import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface InfoCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const InfoCircleSolid = (props: InfoCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 6a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2zm1 5a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default InfoCircleSolid;
