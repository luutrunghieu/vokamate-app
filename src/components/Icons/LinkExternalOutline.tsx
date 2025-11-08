import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface LinkExternalOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const LinkExternalOutline = (props: LinkExternalOutlineProps) => {
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
      d="M7.759 2H10a1 1 0 1 1 0 2H7.8c-.857 0-1.439 0-1.889.038-.438.035-.663.1-.819.18a2 2 0 0 0-.874.874c-.08.156-.145.38-.18.819C4 6.361 4 6.943 4 7.8v8.4c0 .857 0 1.439.038 1.889.035.438.1.663.18.819a2 2 0 0 0 .874.874c.156.08.38.145.819.18C6.361 20 6.943 20 7.8 20h8.4c.857 0 1.439 0 1.889-.038.438-.035.663-.1.819-.18a2 2 0 0 0 .874-.874c.08-.156.145-.38.18-.819.037-.45.038-1.032.038-1.889V14a1 1 0 1 1 2 0v2.241c0 .805 0 1.47-.044 2.01-.046.563-.145 1.08-.392 1.565a4 4 0 0 1-1.748 1.748c-.485.247-1.002.346-1.564.392-.541.044-1.206.044-2.01.044H7.758c-.805 0-1.47 0-2.01-.044-.563-.046-1.08-.145-1.565-.392a4 4 0 0 1-1.748-1.748c-.247-.485-.346-1.002-.392-1.564C2 17.71 2 17.046 2 16.242V7.758c0-.805 0-1.47.044-2.01.046-.563.145-1.08.392-1.565a4 4 0 0 1 1.748-1.748c.485-.247 1.002-.346 1.564-.392C6.29 2 6.954 2 7.758 2"
    />
    <Path
      fill={props.color || "#0F172B"}
      d="M14 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V5.414l-7.293 7.293a1 1 0 0 1-1.414-1.414L18.586 4H15a1 1 0 0 1-1-1"
    />
  </Svg>
  );
};
export default LinkExternalOutline;
