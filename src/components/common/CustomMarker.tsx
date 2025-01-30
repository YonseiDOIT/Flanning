import React from 'react';
import {Platform} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const CustomMarker = ({width = 32, height = 32, fill = '#000', style}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 16 22"
      style={[
        style,
        {
          color: fill,
          transform: [{translateY: Platform.select({ios: -16, android: 0})}],
        },
      ]}>
      <Path
        d="M7.99833 0C3.58109 0 0 3.56658 0 7.96592C0 10.7495 2.08869 13.6658 3.54778 15.3645C4.6904 16.6949 5.67978 18.1448 6.51593 19.6842C6.93566 20.4606 7.32542 21.1971 7.50531 21.5952C7.60525 21.8175 7.7918 21.9502 7.99833 22C8.20487 21.9502 8.39142 21.8175 8.49136 21.5952C8.67125 21.1971 9.061 20.4606 9.48074 19.6842C10.3169 18.1448 11.3063 16.6916 12.4489 15.3645C13.908 13.6658 15.9967 10.7495 15.9967 7.96592C16 3.56658 12.4189 0 7.99833 0Z"
        fill="currentColor" // 🔹 currentColor 적용
      />
    </Svg>
  );
};

export default CustomMarker;
