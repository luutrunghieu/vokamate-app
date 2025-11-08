import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface BookmarkOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const BookmarkOutline = (props: BookmarkOutlineProps) => {
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
      d="M18 7.8c0-.857 0-1.439-.037-1.889-.036-.438-.101-.663-.18-.82a2 2 0 0 0-.875-.873c-.156-.08-.38-.145-.82-.18C15.639 4 15.058 4 14.2 4H9.8c-.857 0-1.439 0-1.889.037-.438.036-.663.101-.82.18a2 2 0 0 0-.873.875c-.08.156-.145.38-.18.82C6 6.361 6 6.942 6 7.8v11.476l5.504-3.144.118-.058a1 1 0 0 1 .874.058L18 19.276zM20 21a1 1 0 0 1-1.496.868L12 18.151l-6.504 3.717A1 1 0 0 1 4 21V7.8c0-.824-.001-1.502.044-2.052.046-.562.144-1.08.392-1.564a4 4 0 0 1 1.748-1.748c.485-.248 1.002-.346 1.564-.392C8.298 1.999 8.976 2 9.8 2h4.4c.824 0 1.502-.001 2.052.044.562.046 1.08.144 1.564.392a4 4 0 0 1 1.749 1.748c.247.485.345 1.002.391 1.564.045.55.044 1.228.044 2.052z"
    />
  </Svg>
  );
};
export default BookmarkOutline;
