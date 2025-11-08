import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ShareSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ShareSolid = (props: ShareSolidProps) => {
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
      d="M10.337 3.14a1.5 1.5 0 0 1 1.2-.552c.407.01.714.213.868.323a8 8 0 0 1 .566.462l8.49 7.277c.105.09.227.194.324.293.11.113.266.292.358.55a1.5 1.5 0 0 1 0 1.014 1.5 1.5 0 0 1-.358.55c-.098.1-.219.203-.323.293l-8.518 7.3a8 8 0 0 1-.539.439c-.154.11-.461.313-.868.323a1.5 1.5 0 0 1-1.2-.552c-.257-.315-.302-.68-.319-.87a8 8 0 0 1-.018-.693v-3.1a10.4 10.4 0 0 0-6.23 3.605A1 1 0 0 1 2 19.163v-.612a10.67 10.67 0 0 1 8-10.322V4.703c0-.245 0-.492.018-.693.017-.19.062-.555.32-.87"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default ShareSolid;
