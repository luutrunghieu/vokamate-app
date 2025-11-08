import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface UserSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const UserSolid = (props: UserSolidProps) => {
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
      d="M8.786 14.5h6.428c.727 0 1.222 0 1.654.076a5 5 0 0 1 4.056 4.056c.076.432.076.927.076 1.654 0 .158.005.318-.023.474a1.5 1.5 0 0 1-1.216 1.217c-.137.024-.28.023-.351.023Q12 21.961 4.59 22c-.07 0-.214.001-.35-.023a1.5 1.5 0 0 1-1.217-1.216c-.028-.157-.023-.317-.023-.475 0-.727 0-1.222.076-1.654a5 5 0 0 1 4.056-4.056c.432-.076.927-.076 1.654-.076M6.5 7.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default UserSolid;
