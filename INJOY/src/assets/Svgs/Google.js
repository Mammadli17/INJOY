import * as React from "react"
import Svg, { G, Rect, Path } from "react-native-svg"
const Google = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={167}
    height={61}
    fill="none"
    {...props}
  >
    <G fill="#0677E8">
      <Rect width={167} height={61} opacity={0.25} rx={12.063} />
      <Path d="M94.914 27.712h-.972v-.05H83.075v4.831h6.823c-.995 2.813-3.67 4.831-6.823 4.831-4.001 0-7.245-3.244-7.245-7.246a7.246 7.246 0 0 1 7.245-7.247c1.846 0 3.526.697 4.806 1.835l3.415-3.416A12.017 12.017 0 0 0 83.074 18C76.406 18 71 23.408 71 30.078c0 6.67 5.406 12.077 12.075 12.077 6.668 0 12.074-5.407 12.074-12.077 0-.81-.083-1.6-.235-2.366Z" />
    </G>
  </Svg>
)
export default Google
