import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface ZapSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const ZapSolid = (props: ZapSolidProps) => {
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
      d="M13.398 1.083a1 1 0 0 1 .594 1.041L13.132 9h6.196c.24 0 .485 0 .684.018.189.017.55.062.863.315a1.5 1.5 0 0 1 .557 1.19c-.006.402-.202.709-.31.864-.114.165-.27.353-.424.538l-8.93 10.715a1 1 0 0 1-1.76-.764l.86-6.876H4.671c-.24 0-.485 0-.684-.018-.189-.017-.55-.062-.863-.315a1.5 1.5 0 0 1-.557-1.19c.006-.402.202-.709.31-.864.114-.165.27-.353.424-.538l.023-.027L12.232 1.36a1 1 0 0 1 1.166-.277"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default ZapSolid;
