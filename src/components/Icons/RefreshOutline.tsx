import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface RefreshOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const RefreshOutline = (props: RefreshOutlineProps) => {
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
      d="M21.766 6.7a1 1 0 1 1-.518 1.932l-.406-.109c1.7 4.306.037 9.32-4.092 11.704a9.49 9.49 0 0 1-8.61.454 1 1 0 0 1 .812-1.828 7.502 7.502 0 0 0 10.149-9.272l-.092.344a1 1 0 1 1-1.932-.518l.732-2.732a1 1 0 0 1 1.224-.707zM15.86 3.319a1 1 0 0 1-.812 1.828A7.503 7.503 0 0 0 4.899 14.42l.092-.345a1 1 0 1 1 1.932.518l-.732 2.732a1 1 0 0 1-1.224.707L2.235 17.3a1 1 0 1 1 .517-1.932l.406.109c-1.7-4.305-.037-9.32 4.092-11.704a9.49 9.49 0 0 1 8.61-.454"
    />
  </Svg>
  );
};
export default RefreshOutline;
