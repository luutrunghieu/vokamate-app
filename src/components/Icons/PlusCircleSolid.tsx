import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface PlusCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const PlusCircleSolid = (props: PlusCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m0 6a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H8a1 1 0 1 1 0-2h3V8a1 1 0 0 1 1-1"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default PlusCircleSolid;
