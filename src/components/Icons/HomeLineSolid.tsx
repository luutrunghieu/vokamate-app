import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface HomeLineSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const HomeLineSolid = (props: HomeLineSolidProps) => {
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
      d="M12.523 1.336a2 2 0 0 0-1.046 0c-.397.108-.732.37-.999.58l-.074.059-6.86 5.335c-.377.292-.709.55-.956.884a3 3 0 0 0-.477.975C2 9.57 2 9.99 2 10.468v7.371c0 .528 0 .982.03 1.357.033.395.104.789.297 1.167a3 3 0 0 0 1.311 1.311c.378.193.772.264 1.167.296.375.031.83.031 1.356.031H17.84c.527 0 .982 0 1.356-.03.395-.033.789-.104 1.167-.297a3 3 0 0 0 1.311-1.311c.193-.378.264-.772.296-1.167.031-.375.031-.83.031-1.356v-7.372c0-.477.001-.897-.111-1.298a3 3 0 0 0-.477-.975c-.247-.334-.58-.592-.956-.884l-6.86-5.335-.074-.059c-.267-.21-.602-.472-1-.58M8 16a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default HomeLineSolid;
