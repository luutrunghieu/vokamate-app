import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SettingsOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const SettingsOutline = (props: SettingsOutlineProps) => {
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
      d="M6 12a4 4 0 0 1 3.874 3H21a1 1 0 1 1 0 2H9.874A4.002 4.002 0 0 1 2 16a4 4 0 0 1 4-4m14-4a2 2 0 1 0-4 0 2 2 0 0 0 4 0M4 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0m18-8a4 4 0 0 1-7.874 1H3a1 1 0 0 1 0-2h11.126A4.002 4.002 0 0 1 22 8"
    />
  </Svg>
  );
};
export default SettingsOutline;
