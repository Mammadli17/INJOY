import * as React from "react"
import Svg, { Defs, G, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style, title */
const Galery = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    viewBox="0 0 32 32"
    fill="#0677E8"
    {...props}
  >
    <Defs></Defs>
    <G id="Layer_6" data-name="Layer 6">
      <Path
        d="M5 5v22h22V5Zm20 2v10.83l-3.5-3.25-5.71 6.33L12 18.83l-5 4.82V7ZM8.49 25l3.86-3.71 3.86 2.13 5.41-6L25 20.56V25Z"
        className="cls-1"
      />
      <Path d="M11.06 15h1.81v2h-1.81z" className="cls-1" />
    </G>
  </Svg>
)
export default Galery
