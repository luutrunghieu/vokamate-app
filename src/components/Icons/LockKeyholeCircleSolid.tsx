import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LockKeyholeCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const LockKeyholeCircleSolid = (props: LockKeyholeCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1m1.628 11.79c-.002.087.033.193.104.405l.917 2.752c.119.355.178.533.142.675a.5.5 0 0 1-.216.3c-.123.078-.31.078-.685.078h-3.78c-.375 0-.562 0-.685-.078a.5.5 0 0 1-.216-.3c-.036-.142.023-.32.142-.675l.917-2.752c.071-.212.106-.318.104-.404a.4.4 0 0 0-.056-.22c-.04-.077-.146-.176-.36-.374a3 3 0 1 1 4.086 0c-.212.198-.319.297-.358.374a.4.4 0 0 0-.056.22"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default LockKeyholeCircleSolid;
