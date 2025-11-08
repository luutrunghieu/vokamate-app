import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SunOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const SunOutline = (props: SunOutlineProps) => {
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
      d="M11 22v-2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m-5.393-5.018a1 1 0 0 1 1.414 1.416L5.607 19.81a1.001 1.001 0 0 1-1.415-1.413zm11.372 0a1 1 0 0 1 1.414 0l1.415 1.416a1 1 0 0 1-1.415 1.413l-1.415-1.413a1 1 0 0 1 0-1.416M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0M4 11a1 1 0 1 1 0 2H2a1 1 0 1 1 0-2zm18 0a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2zM4.192 4.192c.39-.39 1.025-.39 1.415 0l1.414 1.415a1 1 0 0 1-1.414 1.414L4.192 5.607a1 1 0 0 1 0-1.415m14.2 0a1.001 1.001 0 0 1 1.416 1.415l-1.415 1.414a1 1 0 0 1-1.415-1.414zM11 4V2a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0m7 8a6 6 0 1 1-12 0 6 6 0 0 1 12 0"
    />
  </Svg>
  );
};
export default SunOutline;
