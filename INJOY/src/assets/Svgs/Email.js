import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Email = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#292C35"
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.665 15.08H3.335C2.051 15.08 1 14.004 1 12.666V3.414C1 2.086 2.041 1 3.335 1h13.33C17.949 1 19 2.076 19 3.414v9.252c0 1.338-1.041 2.414-2.335 2.414Z"
    />
    <Path
      fill="#292C35"
      d="m17.998 1.774-6.685 6.86c-.749.774-1.877.774-2.636 0l-6.685-6.86"
    />
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m17.998 1.774-6.685 6.86c-.749.774-1.877.774-2.636 0l-6.685-6.86M12.072 7.96l5.926 5.943M2.002 13.903 7.996 8.04"
    />
  </Svg>
)
export default Email
