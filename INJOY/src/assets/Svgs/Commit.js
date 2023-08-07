import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      fill="white"
      fillRule="evenodd"
      d="M19.494 24.633 16 29l-3.494-4.367c-6.042-1.278-10.514-5.77-10.514-11.132C1.992 7.146 8.264 1.994 16 1.994c7.736 0 14.008 5.152 14.008 11.507 0 5.362-4.472 9.854-10.514 11.132ZM16 0C7.163 0 0 6.143 0 13.72c0 6.249 4.877 11.512 11.542 13.169L16 32.001l4.459-5.112C27.123 25.232 32 19.969 32 13.72 32 6.143 24.837 0 16 0Z"
    />
  </Svg>
)
export default SvgComponent
