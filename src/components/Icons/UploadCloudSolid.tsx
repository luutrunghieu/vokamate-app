import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface UploadCloudSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const UploadCloudSolid = (props: UploadCloudSolidProps) => {
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
      d="M19.491 8.187A6 6 0 0 1 18 20H6.5A6.5 6.5 0 0 1 4.968 7.181a8.003 8.003 0 0 1 14.523 1.005m-12.198 4.52a1 1 0 0 0 1.414 0L11 10.414V16a1 1 0 1 0 2 0v-5.586l2.293 2.293a1 1 0 0 0 1.414-1.414l-4-4a1 1 0 0 0-1.414 0l-4 4a1 1 0 0 0 0 1.414"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default UploadCloudSolid;
