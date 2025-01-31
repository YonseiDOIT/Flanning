import React from 'react';
import Svg, {Path, G, ClipPath, Rect, Defs} from 'react-native-svg';

const DefaultIcon = ({width = 32, height = 32, fill = '#000', style}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      style={[style, {color: fill}]}>
      <G clipPath="url(#clip0_4424_6714)">
        <Path
          d="M9.36436 7.52129H14.8856V2H9.36436V7.52129ZM16.7287 2V7.52129H22.25V2H16.7287ZM2 7.52129H7.52129V2H2V7.52129ZM9.36436 14.8856H14.8856V9.36436H9.36436V14.8856ZM16.7287 14.8856H22.25V9.36436H16.7287V14.8856ZM2 14.8856H7.52129V9.36436H2V14.8856ZM9.36436 22.25H14.8856V16.7287H9.36436V22.25ZM16.7287 22.25H22.25V16.7287H16.7287V22.25ZM2 22.25H7.52129V16.7287H2V22.25Z"
          fill="currentColor"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4424_6714">
          <Rect width="24" height="24" fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default DefaultIcon;
