import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface AlertTriangleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const AlertTriangleSolid = (props: AlertTriangleSolidProps) => {
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
      d="M12.813 1.668a2 2 0 0 0-1.626 0c-.4.178-.659.49-.84.746-.177.25-.367.579-.576.94l-8.267 14.28c-.21.362-.4.692-.53.971-.132.285-.274.666-.229 1.102a2 2 0 0 0 .813 1.41c.355.258.757.326 1.069.355.306.028.687.028 1.106.028h16.534c.419 0 .8 0 1.106-.028.312-.029.714-.097 1.069-.354a2 2 0 0 0 .813-1.41c.045-.437-.097-.818-.229-1.103-.13-.28-.32-.609-.53-.971L14.23 3.354c-.21-.361-.4-.69-.577-.94-.18-.255-.44-.568-.84-.746M13 9a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default AlertTriangleSolid;
