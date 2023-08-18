import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Password = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={34}
    fill="none"
    {...props}
  >
    <Rect
      width={23.72}
      height={16.336}
      x={4.473}
      y={14.761}
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.062}
      rx={1.021}
    />
    <Path
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.062}
      d="M16.452 21.65v2.505M10.55 13.748V9.02a6.125 6.125 0 0 1 6.124-6.125h1.225a6.125 6.125 0 0 1 6.125 6.125v1.003"
    />
  </Svg>
)
export default Password
