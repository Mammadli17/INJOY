import * as React from "react"
import Svg, { Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */
const StoryCancel = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 32 32"
    fill={"white"}
    {...props}
  >
    <Path d="M10.771 8.518c-1.144.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-.915.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c.915.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c.915-.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-.173-.171-.394-.223-.657-.173zM16 1C7.715 1 1 7.716 1 16s6.715 15 15 15 15-6.716 15-15S24.285 1 16 1zm0 3.75c6.213 0 11.25 5.037 11.25 11.25S22.213 27.25 16 27.25 4.75 22.213 4.75 16C4.751 9.787 9.787 4.75 16 4.75z" />
  </Svg>
)
export default StoryCancel
