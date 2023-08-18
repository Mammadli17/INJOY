import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Settings = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.062}
      d="M13.727 4.382c.662-2.732 4.548-2.732 5.21 0A2.682 2.682 0 0 0 22.94 6.04c2.4-1.462 5.148 1.285 3.686 3.686a2.682 2.682 0 0 0 1.657 4.001c2.731.663 2.731 4.548 0 5.21a2.682 2.682 0 0 0-1.658 4.003c1.462 2.4-1.285 5.149-3.687 3.686a2.683 2.683 0 0 0-4 1.657c-.663 2.731-4.548 2.731-5.211 0a2.68 2.68 0 0 0-4.002-1.658c-2.4 1.462-5.149-1.285-3.687-3.687a2.681 2.681 0 0 0-1.656-4c-2.732-.663-2.732-4.548 0-5.211A2.682 2.682 0 0 0 6.04 9.725c-1.462-2.4 1.285-5.149 3.686-3.687a2.68 2.68 0 0 0 4-1.656Z"
    />
    <Path
      stroke="#0777E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4.083}
      d="M20.999 16.332a4.666 4.666 0 1 1-9.333 0 4.666 4.666 0 0 1 9.333 0v0Z"
    />
  </Svg>
)
export default Settings
