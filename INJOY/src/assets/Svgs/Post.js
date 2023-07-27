import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Post = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={53}
    height={53  }
    viewBox="0 0 27.963 27.963"
    {...props}
  >
    <Path d="M13.98 0C6.259 0 0 6.26 0 13.982s6.259 13.981 13.98 13.981c7.725 0 13.983-6.26 13.983-13.981C27.963 6.26 21.705 0 13.98 0zm7.122 16.059h-4.939v5.042h-4.299v-5.042H6.862V11.76h5.001v-4.9h4.299v4.9h4.939v4.299h.001z" 
    fill='#0677E8'
    />
  </Svg>
)
export default Post
