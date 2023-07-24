import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
const Lock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={21}
    fill="none"
    {...props}
  >
    <G
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.563}
    >
      <Path
        fill="#292C35"
        d="M.917 16.912v-4.156a3.292 3.292 0 0 1 3.291-3.292h10.594a3.292 3.292 0 0 1 3.292 3.292v4.156a3.292 3.292 0 0 1-3.292 3.292H4.208a3.285 3.285 0 0 1-3.291-3.292Z"
      />
      <Path d="M4.135 9.475V6.298A5.37 5.37 0 0 1 9.5.933a5.37 5.37 0 0 1 5.364 5.365v3.177H4.136ZM9.5 16.985v-2.687" />
      <Path
        fill="#292C35"
        d="M9.5 14.84a1.073 1.073 0 1 0 0-2.146 1.073 1.073 0 0 0 0 2.145Z"
      />
    </G>
  </Svg>
)
export default Lock
