import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={36}
    viewBox="0 -0.5 21 21"
    {...props}
  >
    <Path
      fill="#0677E8"
      fillRule="evenodd"
      d="M7.35 16h2.1V8h-2.1v8Zm4.2 0h2.1V8h-2.1v8Zm-6.3 2h10.5V6H5.25v12Zm2.1-14h6.3V2h-6.3v2Zm8.4 0V0H5.25v4H0v2h3.15v14h14.7V6H21V4h-5.25Z"
    />
  </Svg>
)
export default SvgComponent
