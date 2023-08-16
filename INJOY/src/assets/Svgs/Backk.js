import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Backk = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Rect width={32} height={32} fill="#E6E8EC" rx={16} />
    <Path
      fill="#23262F"
      fillRule="evenodd"
      d="M18.943 10.39c.52.521.52 1.365 0 1.886L15.219 16l3.724 3.724a1.333 1.333 0 1 1-1.886 1.886l-4.666-4.667a1.333 1.333 0 0 1 0-1.886l4.666-4.667c.52-.52 1.365-.52 1.886 0Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Backk
