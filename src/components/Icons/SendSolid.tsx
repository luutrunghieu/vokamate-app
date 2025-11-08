import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface SendSolidProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const SendSolid = (props: SendSolidProps) => {
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
      d="M21.595 1.458c-.396-.133-.764-.037-.947.016-.2.058-.438.151-.677.244L3.014 8.336c-.267.104-.525.205-.724.303-.173.085-.54.275-.744.669a1.5 1.5 0 0 0 .001 1.384c.205.394.572.583.744.668.2.098.458.199.725.303l4.72 1.835c.352.137.528.206.704.21a1 1 0 0 0 .448-.095c.159-.074.292-.208.56-.475l4.845-4.845a1 1 0 1 1 1.414 1.414l-4.845 4.845c-.267.268-.401.401-.475.56a1 1 0 0 0-.095.448c.005.176.073.352.21.704l1.835 4.72c.104.267.205.525.303.725.085.172.274.539.668.744a1.5 1.5 0 0 0 1.384 0c.394-.204.584-.57.669-.742.098-.2.2-.458.303-.725l6.618-16.957c.093-.24.186-.477.244-.677.053-.183.149-.551.017-.947a1.5 1.5 0 0 0-.948-.947"
    />
  </Svg>
  );
};
export default SendSolid;
