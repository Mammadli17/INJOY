import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Publish = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={100}
    height={100}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeWidth={2}
      d="m9 10 3.258 2.444a1 1 0 0 0 1.353-.142L20 5"
    />
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeWidth={2}
      d="M21 12a9 9 0 1 1-6.67-8.693"
    />
  </Svg>
)
export default Publish
