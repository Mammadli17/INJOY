import * as React from "react"
import Svg, { Path } from "react-native-svg"
const More = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={40}
    height={30}
    fill="none"
    viewBox="0 0 20 20"
    {...props}
  >
    <Path
      fill="white"
      fillRule="evenodd"
      d="M12 3a2 2 0 1 0-4 0 2 2 0 0 0 4 0zm-2 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm0 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
    />
  </Svg>
)
export default More
