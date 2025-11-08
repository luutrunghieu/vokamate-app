import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface HelpCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const HelpCircleSolid = (props: HelpCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m-1.093 7.271a2 2 0 0 1 3.013 1.727V10c0 .47-.365.958-1.055 1.418a6 6 0 0 1-1.262.634 1 1 0 0 0 .633 1.897l.169-.061a8.05 8.05 0 0 0 1.57-.806c.81-.54 1.944-1.55 1.945-3.081a4 4 0 0 0-7.773-1.333 1 1 0 0 0 1.886.664 2 2 0 0 1 .874-1.06M12 16a1 1 0 1 0 0 2h.01a1 1 0 0 0 0-2z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default HelpCircleSolid;
