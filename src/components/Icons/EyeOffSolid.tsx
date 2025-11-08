import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface EyeOffSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const EyeOffSolid = (props: EyeOffSolidProps) => {
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
      d="M2.293 2.293a1 1 0 0 1 1.414 0l18 18a1 1 0 0 1-1.414 1.414l-3.154-3.154C15.694 19.4 13.972 20 12 20c-2.862 0-5.195-1.265-6.923-2.707s-2.91-3.107-3.503-4.046l-.024-.038c-.118-.185-.27-.425-.347-.762a2.2 2.2 0 0 1 0-.894c.077-.337.23-.578.348-.764l.024-.038c.603-.953 1.826-2.676 3.62-4.141L2.293 3.707a1 1 0 0 1 0-1.414m6.26 7.675a4 4 0 0 0 5.478 5.478l-1.513-1.514a2 2 0 0 1-2.45-2.45z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || "#0F172B"}
      d="M15.992 11.75a4 4 0 0 0-3.742-3.742L8.792 4.549A9.7 9.7 0 0 1 12 4c2.862 0 5.195 1.265 6.923 2.707s2.91 3.107 3.503 4.046l.024.038c.117.185.27.425.347.762a2.2 2.2 0 0 1 0 .894c-.077.337-.23.577-.347.762l-.024.038a18.4 18.4 0 0 1-2.158 2.779z"
    />
  </Svg>
  );
};
export default EyeOffSolid;
