import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface PlayCircleSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const PlayCircleSolid = (props: PlayCircleSolidProps) => {
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
      d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1M9.6 8.116c-.1.133-.1.372-.1.85v6.069c0 .477 0 .716.1.849a.5.5 0 0 0 .364.199c.166.012.367-.117.769-.375l4.72-3.035c.349-.224.523-.336.583-.479a.5.5 0 0 0 0-.389c-.06-.142-.234-.254-.583-.478l-4.72-3.035c-.402-.258-.603-.387-.769-.375a.5.5 0 0 0-.364.2"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default PlayCircleSolid;
