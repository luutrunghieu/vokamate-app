import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface BookClosedSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const BookClosedSolid = (props: BookClosedSolidProps) => {
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
      d="M3.044 19.252c.046.562.145 1.079.392 1.564a4 4 0 0 0 1.748 1.748c.485.247 1.002.346 1.564.392C7.29 23 7.954 23 8.758 23h8.08c.528 0 .982 0 1.357-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.028-.336.031-.736.031-1.195V5.161c0-.527 0-.981-.03-1.356-.033-.395-.104-.789-.297-1.167a3 3 0 0 0-1.311-1.311c-.378-.193-.772-.264-1.167-.296C17.82 1 17.365 1 16.839 1h-8.08c-.805 0-1.47 0-2.01.044-.563.046-1.08.145-1.565.392a4 4 0 0 0-1.748 1.748c-.247.485-.346 1.002-.392 1.564C3 5.29 3 5.954 3 6.758v10.483c0 .671-.01 1.343.044 2.01m15.932.78c-.022.272-.06.372-.085.422a1 1 0 0 1-.437.437c-.05.025-.15.063-.422.085C17.75 21 17.377 21 16.8 21h-8c-.857 0-1.439 0-1.889-.038-.438-.035-.663-.1-.819-.18a2 2 0 0 1-.874-.874c-.18-.352-.268-.656-.201-1.168A2 2 0 0 1 7 17h12c0 1.005.058 2.03-.024 3.032"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default BookClosedSolid;
