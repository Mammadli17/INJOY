import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Call = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#E3F2FF"
      d="M16.167 12.467h-.68l-2.54 2.54-7.954-7.954 2.54-2.54v-.68L3.693 0H3.02L.14 2.88 0 3.213A16.8 16.8 0 0 0 16.787 20l.333-.14L20 16.98v-.673l-3.833-3.84Z"
    />
  </Svg>
)
export default Call
