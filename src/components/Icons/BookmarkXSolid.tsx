import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface BookmarkXSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const BookmarkXSolid = (props: BookmarkXSolidProps) => {
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
      d="M14.241 2H9.76c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C4 6.29 4 6.954 4 7.758V21a1 1 0 0 0 1.496.868L12 18.152l6.504 3.716A1 1 0 0 0 20 21V7.759c0-.805 0-1.47-.044-2.01-.046-.563-.145-1.08-.392-1.565a4 4 0 0 0-1.748-1.748c-.485-.247-1.002-.346-1.564-.392C15.71 2 15.046 2 14.242 2M8.793 6.793a1 1 0 0 1 1.414 0L12 8.586l1.793-1.793a1 1 0 1 1 1.414 1.414L13.414 10l1.793 1.793a1 1 0 0 1-1.414 1.414L12 11.414l-1.793 1.793a1 1 0 0 1-1.414-1.414L10.586 10 8.793 8.207a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default BookmarkXSolid;
