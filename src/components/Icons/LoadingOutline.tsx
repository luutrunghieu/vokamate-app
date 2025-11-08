import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LoadingOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const LoadingOutline = (props: LoadingOutlineProps) => {
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
      d="M12 1.25a1 1 0 0 1 1 1v2.5a1 1 0 1 1-2 0v-2.5a1 1 0 0 1 1-1M12 17a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1M1.25 12a1 1 0 0 1 1-1h3.5a1 1 0 1 1 0 2h-3.5a1 1 0 0 1-1-1M18.75 12a1 1 0 0 1 1-1h1.5a1 1 0 1 1 0 2h-1.5a1 1 0 0 1-1-1M17.043 17.043a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414M19.371 4.709a1 1 0 0 1 0 1.414l-1.414 1.414a1 1 0 1 1-1.414-1.414l1.414-1.414a1 1 0 0 1 1.414 0M8.457 15.543a1 1 0 0 1 0 1.414L5.63 19.785a1 1 0 1 1-1.415-1.414l2.829-2.828a1 1 0 0 1 1.414 0M4.422 4.502a1 1 0 0 1 1.414 0l2.121 2.12a1 1 0 0 1-1.414 1.415L4.422 5.916a1 1 0 0 1 0-1.414"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default LoadingOutline;
