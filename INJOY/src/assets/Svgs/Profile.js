import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Profile = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <Path
      fill="#292C35"
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.68 8.813A3.907 3.907 0 1 0 9.68 1a3.907 3.907 0 0 0 0 7.813Z"
    />
    <Path
      fill="#292C35"
      d="M1.787 19.667V17.44c0-2.6 2.106-4.693 4.693-4.693h7.027c2.6 0 4.693 2.107 4.693 4.693v2.227"
    />
    <Path
      stroke="#0677E8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1.787 19.667V17.44c0-2.6 2.106-4.693 4.693-4.693h7.027c2.6 0 4.693 2.107 4.693 4.693v2.227"
    />
  </Svg>
)
export default Profile
