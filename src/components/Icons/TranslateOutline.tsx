import * as React from "react";
import Svg, { Path } from "react-native-svg";

interface TranslateOutlineProps {
  width?: number;
  height?: number;
  color?: string;
  [key: string]: any;
}

const TranslateOutline = (props: TranslateOutlineProps) => {
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
      d="M9 3a1 1 0 0 0-2 0v1H2a1 1 0 1 0 0 2h8.28a17 17 0 0 1-2.304 5.413c-.89-.835-1.644-1.829-2.055-2.802a1 1 0 0 0-1.842.778c.554 1.31 1.542 2.592 2.696 3.637a16.3 16.3 0 0 1-5.22 4.079 1 1 0 1 0 .89 1.79 18.3 18.3 0 0 0 5.919-4.651c.406.26.818.485 1.226.668a1 1 0 0 0 .82-1.824 7 7 0 0 1-.845-.451A19 19 0 0 0 12.328 6H14a1 1 0 1 0 0-2H9z"
    />
    <Path
      fill={props.color || "#0F172B"}
      fillRule="evenodd"
      d="M17.152 9.308a1.5 1.5 0 0 0-1.304 0c-.359.173-.553.475-.65.637a8 8 0 0 0-.306.6L12.02 16.55l-.019.038-1.903 3.98a1 1 0 1 0 1.804.863L13.543 18h5.914l1.64 3.431a1 1 0 1 0 1.805-.863L21 16.589l-.019-.038-2.872-6.004c-.101-.214-.205-.43-.306-.6-.097-.163-.291-.465-.65-.638m-.652 2.51 2 4.182h-4z"
      clipRule="evenodd"
    />
  </Svg>
  );
};
export default TranslateOutline;
