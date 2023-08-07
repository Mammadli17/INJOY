import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={30}
    height={28}
    fill="none"
    viewBox="0 0 64 64"
    {...props}
  >
    <Path
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="m30.051 45.607-12.2 9.133a3.892 3.892 0 0 1-6.223-3.114v-36.32a7.782 7.782 0 0 1 7.781-7.782H45.35a7.782 7.782 0 0 1 7.781 7.782v36.319a3.89 3.89 0 0 1-6.223 3.114l-12.193-9.132a3.89 3.89 0 0 0-4.664 0v0Z"
    />
  </Svg>
)
export default SvgComponent
