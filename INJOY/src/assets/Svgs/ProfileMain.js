import * as React from "react"
import Svg, { Path } from "react-native-svg"
const ProfileMain = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    {...props}
  >
    <Path
      fill="#9B9B9B"
      fillRule="evenodd"
      d="M11.807 1.817a4.282 4.282 0 1 0 0 8.564 4.282 4.282 0 0 0 0-8.564ZM5.71 6.099a6.099 6.099 0 1 1 12.197 0 6.099 6.099 0 0 1-12.197 0ZM2.494 18.064c1.886-2.015 4.953-3.531 9.66-3.531 4.706 0 7.774 1.516 9.66 3.531 1.862 1.99 2.494 4.383 2.494 6.028A.908.908 0 0 1 23.4 25H.908A.908.908 0 0 1 0 24.092c0-1.645.632-4.038 2.494-6.028Zm-.6 5.12h20.52a7.497 7.497 0 0 0-1.927-3.878c-1.487-1.59-4.043-2.957-8.333-2.957s-6.846 1.367-8.333 2.957a7.497 7.497 0 0 0-1.927 3.877Z"
      clipRule="evenodd"
      {...props}
    />
  </Svg>
)
export default ProfileMain
