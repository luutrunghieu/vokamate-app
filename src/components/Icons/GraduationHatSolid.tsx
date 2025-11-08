import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface GraduationHatSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const GraduationHatSolid = (props: GraduationHatSolidProps) => {
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
      d="M22.447 9.394a1 1 0 0 0 0-1.788L12.78 2.772a2 2 0 0 0-.502-.187 1.5 1.5 0 0 0-.554 0c-.216.04-.41.139-.502.187L1.553 7.606a1 1 0 0 0 0 1.788l9.73 4.879c.263.131.394.197.532.223a1 1 0 0 0 .37 0c.138-.026.27-.092.532-.223z"
    />
    <Path
      fill={props.color || "#0F172B"}
      d="M19.997 14.165c0-.43 0-.644-.09-.773a.5.5 0 0 0-.337-.208c-.156-.023-.348.073-.732.265l-6.059 3.03c-.093.047-.286.146-.502.186a1.5 1.5 0 0 1-.554 0c-.216-.04-.41-.139-.502-.186l-6.06-3.03c-.383-.192-.575-.288-.73-.265a.5.5 0 0 0-.337.208c-.09.13-.09.344-.09.773q0 .96-.004 1.922c-.001.276-.003.623.11.947a2 2 0 0 0 .461.747c.24.245.551.4.798.522q2.766 1.373 5.523 2.761c.203.102.458.23.74.284.243.045.493.045.737 0 .281-.053.536-.182.739-.284a883 883 0 0 1 5.523-2.761c.247-.123.558-.277.798-.522a2 2 0 0 0 .462-.747c.112-.324.11-.671.11-.947q-.004-.96-.004-1.922"
    />
  </Svg>
  );
};
export default GraduationHatSolid;
