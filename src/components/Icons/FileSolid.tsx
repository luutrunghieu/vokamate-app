import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface FileSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const FileSolid = (props: FileSolidProps) => {
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
      d="M15.241 1H8.76c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C3 5.29 3 5.954 3 6.758v10.483c0 .805 0 1.47.044 2.01.046.563.145 1.08.392 1.565a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 23 7.954 23 8.758 23h6.483c.805 0 1.47 0 2.01-.044.563-.046 1.08-.145 1.565-.392a4 4 0 0 0 1.748-1.748c.247-.485.346-1.002.392-1.564.044-.541.044-1.206.044-2.01V6.758c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748c-.485-.247-1.002-.346-1.564-.392C16.71 1 16.046 1 15.242 1M8 6a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2zm-1 5a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default FileSolid;
