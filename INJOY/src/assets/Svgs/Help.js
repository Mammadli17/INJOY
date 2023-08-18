import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Help = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={34}
    fill="none"
    {...props}
  >
    <Path
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.062}
      d="M16.332 30.949c7.732 0 14-6.268 14-14 0-7.73-6.268-13.998-14-13.998-7.731 0-13.999 6.267-13.999 13.999 0 7.731 6.268 13.999 14 13.999Z"
    />
    <Path
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.062}
      d="M12.372 12.867a4.083 4.083 0 0 1 7.934 1.36c0 2.723-4.083 4.084-4.083 4.084M16.332 23.755h.013"
    />
  </Svg>
)
export default Help
