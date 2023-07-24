import * as React from "react"
import Svg, { G, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Back = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={93}
    height={93}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Path
        fill="#fff"
        d="M48.79 12H32.21C24.363 12 18 18.362 18 26.21v16.58C18 50.637 24.362 57 32.21 57h16.58C56.637 57 63 50.638 63 42.79V26.21C63 18.363 56.638 12 48.79 12Z"
      />
    </G>
    <Path
      stroke="#201D67"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.368}
      d="M43.921 29 38 34.547l5.921 5.92"
    />
    <Defs></Defs>
  </Svg>
)
export default Back
