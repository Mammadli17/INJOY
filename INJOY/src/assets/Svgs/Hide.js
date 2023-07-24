import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Hide = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
   
  >
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.52 16.677a10 10 0 0 1-2.52.31c-3.27 0-6.2-1.53-8.2-3.95-1.4-1.69-1.4-4.3 0-5.98.16-.2.34-.39.52-.58M18.2 13.038c-.8.96-1.75 1.78-2.8 2.42L4.59 4.638c1.59-.98 3.43-1.53 5.41-1.53 3.27 0 6.2 1.53 8.2 3.95 1.4 1.68 1.4 4.3 0 5.98Z"
    />
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.08 10.048c0 .85-.35 1.62-.9 2.18l-4.36-4.36c.55-.56 1.33-.9 2.18-.9 1.71 0 3.08 1.37 3.08 3.08ZM.75.798l3.84 3.84 3.23 3.23 4.36 4.36 3.23 3.23 3.84 3.84"
    />
  </Svg>
)
export default Hide
