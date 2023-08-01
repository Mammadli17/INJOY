import * as React from "react"
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  RadialGradient,
  Path,
} from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Cancel = (props) => (
  <Svg
    width={30}
    height={30}
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs>
      <LinearGradient id="c">
        <Stop stopColor="#eee" />
        <Stop offset={1} stopColor="#eee" stopOpacity={0} />
      </LinearGradient>
      <LinearGradient id="b">
        <Stop />
        <Stop offset={1} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient id="d">
        <Stop stopColor="#e85752" />
        <Stop offset={1} stopColor="#d20303" />
      </LinearGradient>
      <LinearGradient id="a">
        <Stop stopColor="#eee" />
        <Stop offset={1} stopColor="#dcdcdc" />
      </LinearGradient>
      <LinearGradient
        xlinkHref="#d"
        id="g"
        x2={0}
        y1={6.606}
        y2={120.27}
        gradientUnits="userSpaceOnUse"
      />
      <RadialGradient
        xlinkHref="#b"
        id="e"
        cx={27.499}
        cy={122.6}
        r={18.17}
        gradientTransform="matrix(1 0 0 .18919 0 99.404)"
        gradientUnits="userSpaceOnUse"
      />
      <RadialGradient
        xlinkHref="#c"
        id="h"
        cx={64.26}
        cy={-9.988}
        r={56.927}
        gradientTransform="matrix(1.15538 0 0 1.42352 -9.984 6.29)"
        gradientUnits="userSpaceOnUse"
      />
    </Defs>
    <Path
      fill="url(#e)"
      d="M45.667 122.598a18.169 3.437 0 1 1-36.337 0 18.169 3.437 0 1 1 36.337 0z"
      filter="url(#f)"
      opacity={0.267}
      transform="matrix(1.13514 0 0 1 -8.626 .491)"
    />
    <Path
      fill="url(#e)"
      d="M45.667 122.598a18.169 3.437 0 1 1-36.337 0 18.169 3.437 0 1 1 36.337 0z"
      filter="url(#f)"
      opacity={0.267}
      transform="matrix(1.13514 0 0 1 73.873 .491)"
    />
    <Path
      fill="#9c0f0f"
      d="M7.03 18.815a8.16 8.16 0 0 0 0 11.537l33.06 33.06L7.03 96.473a8.16 8.16 0 0 0 0 11.537l12.658 12.658c3.185 3.185 8.298 3.132 11.483-.053l33.061-33.061 33.114 33.114c3.185 3.185 8.299 3.132 11.484-.053l12.604-12.605c3.185-3.185 3.239-8.298.054-11.483L88.373 63.412l33.061-33.06c3.185-3.185 3.239-8.299.054-11.484L108.83 6.21a8.16 8.16 0 0 0-11.537 0l-33.06 33.061L31.17 6.211a8.16 8.16 0 0 0-11.536 0L7.03 18.814z"
    />
    <Path
      fill="url(#g)"
      d="M25.406 6.625c-1.36 0-2.753.503-3.812 1.563L9 20.78a5.336 5.336 0 0 0 0 7.594l33.063 33.063a2.8 2.8 0 0 1 0 3.937L9 98.438a5.336 5.336 0 0 0 0 7.593l12.656 12.656c2.122 2.123 5.396 2.104 7.532-.03L62.25 85.593a2.8 2.8 0 0 1 3.938 0l33.124 33.094c2.116 2.115 5.434 2.097 7.563-.032l12.594-12.625c2.141-2.141 2.178-5.415.062-7.531L86.406 65.375a2.8 2.8 0 0 1 0-3.937l33.063-33.063c2.141-2.142 2.178-5.415.062-7.531L106.875 8.187a5.385 5.385 0 0 0-7.625 0L66.187 41.25a2.8 2.8 0 0 1-3.937 0L29.187 8.187a5.27 5.27 0 0 0-3.78-1.562z"
    />
    <Path
      fill="none"
      stroke="url(#h)"
      strokeWidth={2}
      d="M103.063 7.531a4.45 4.45 0 0 0-3.157 1.313L66.844 41.906a3.744 3.744 0 0 1-5.25 0L28.53 8.844c-.895-.896-1.99-1.281-3.125-1.281-1.13 0-2.282.407-3.156 1.28L9.656 21.439c-1.765 1.764-1.765 4.516 0 6.28L42.72 60.782a3.744 3.744 0 0 1 0 5.25L9.656 99.094c-1.765 1.765-1.765 4.516 0 6.281l12.656 12.656c1.78 1.78 4.42 1.767 6.22-.031l33.062-33.062a3.744 3.744 0 0 1 5.25 0l33.125 33.093c1.767 1.768 4.463 1.755 6.25-.03l12.594-12.626c1.807-1.808 1.832-4.448.062-6.219L85.75 66.031a3.744 3.744 0 0 1 0-5.25l33.063-33.062c1.807-1.808 1.832-4.449.062-6.219L106.219 8.844a4.45 4.45 0 0 0-3.156-1.313z"
    />
  </Svg>
)
export default Cancel
