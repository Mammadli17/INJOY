import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Log = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      fill="#0777E8"
      fillRule="evenodd"
      d="M0 16.614c0-.67.544-1.214 1.215-1.214H22.27a1.215 1.215 0 1 1 0 2.43H1.215C.544 17.83 0 17.284 0 16.614Z"
      clipRule="evenodd"
    />
    <Path
      fill="#0777E8"
      fillRule="evenodd"
      d="M14.933 7.657a1.215 1.215 0 0 1 1.718 0l7.984 7.984c.538.537.538 1.41 0 1.947l-7.984 7.984a1.215 1.215 0 1 1-1.718-1.718l7.24-7.24-7.24-7.24a1.215 1.215 0 0 1 0-1.717Z"
      clipRule="evenodd"
    />
    <Path
      fill="#0777E8"
      fillRule="evenodd"
      d="M21.596 1.497c0-.67.544-1.215 1.215-1.215h7.397c.76 0 1.377.617 1.377 1.377V31.57c0 .76-.617 1.377-1.377 1.377H21.73a1.215 1.215 0 1 1 0-2.43h7.424V2.712h-6.344c-.67 0-1.215-.544-1.215-1.215Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Log
