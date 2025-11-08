import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface TrashSolidSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const TrashSolidSolid = (props: TrashSolidSolidProps) => {
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
      d="M8 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1"
    />
    <Path
      fill={props.color || "#0F172B"}
      fillRule="evenodd"
      d="M2 6a1 1 0 0 1 1-1h18a1 1 0 1 1 0 2h-1.064l-.642 9.625c-.05.756-.092 1.381-.167 1.89-.078.53-.201 1.014-.458 1.465a4 4 0 0 1-1.731 1.62c-.467.226-.959.317-1.493.36-.512.04-1.139.04-1.896.04h-3.098c-.757 0-1.384 0-1.896-.04-.534-.043-1.025-.134-1.493-.36a4 4 0 0 1-1.73-1.62c-.258-.451-.381-.935-.46-1.465-.074-.509-.115-1.134-.166-1.89L4.064 7H3a1 1 0 0 1-1-1m8 3.5a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0v-5a1 1 0 0 1 1-1m5 1a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default TrashSolidSolid;
