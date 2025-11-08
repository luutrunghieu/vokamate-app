import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface EyeSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const EyeSolid = (props: EyeSolidProps) => {
  const { width = 24, height = 24, ...restProps } = props;

  return (
  <Svg
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
      {...restProps}
    >
    <Path fill={props.color || "#0F172B"} d="M10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
    <Path
      fill={props.color || "#0F172B"}
      fillRule="evenodd"
      d="M12 4C9.138 4 6.805 5.265 5.077 6.707c-1.726 1.441-2.91 3.107-3.503 4.046l-.024.038c-.117.185-.27.425-.347.762a2.2 2.2 0 0 0 0 .894c.077.337.23.577.347.762l.024.038c.593.939 1.777 2.605 3.503 4.046C6.805 18.735 9.138 20 12 20s5.195-1.265 6.923-2.707 2.91-3.107 3.503-4.046l.024-.038c.117-.185.27-.425.347-.762a2.2 2.2 0 0 0 0-.894c-.077-.337-.23-.577-.347-.762l-.024-.038c-.593-.939-1.776-2.605-3.503-4.046S14.862 4 12 4m0 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default EyeSolid;
