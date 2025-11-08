import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface MenuOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const MenuOutline = (props: MenuOutlineProps) => {
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
      d="M21 14.5a1 1 0 1 1 0 2H3a1 1 0 1 1 0-2zm0-7a1 1 0 1 1 0 2H3a1 1 0 0 1 0-2z"
    />
  </Svg>
  );
};
export default MenuOutline;
