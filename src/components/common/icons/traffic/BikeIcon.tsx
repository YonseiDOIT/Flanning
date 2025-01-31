import React from 'react';
import {Svg, Path} from 'react-native-svg';

const BikeIcon = ({width = 24, height = 24, fill = 'currentColor', style}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      style={[style, {color: fill}]}>
      <Path
        d="M10.0005 5C10.0005 4.73478 10.1058 4.48043 10.2933 4.29289C10.4809 4.10536 10.7352 4 11.0005 4H13.6145C14.2252 4.00003 14.8214 4.18645 15.3233 4.53437C15.8253 4.88229 16.2091 5.37512 16.4235 5.947L18.7175 12.064C19.672 12.2382 20.5307 12.7533 21.1338 13.5135C21.7368 14.2737 22.043 15.2271 21.9954 16.1963C21.9478 17.1654 21.5496 18.0843 20.875 18.7817C20.2004 19.4791 19.2953 19.9076 18.3283 19.9875C17.3613 20.0673 16.3982 19.7929 15.6184 19.2155C14.8386 18.6381 14.2951 17.797 14.0893 16.8488C13.8835 15.9005 14.0292 14.9098 14.4995 14.061C14.9697 13.2123 15.7324 12.5633 16.6455 12.235L16.1825 11L9.21046 13.614C9.74751 14.3366 10.0251 15.2193 9.99822 16.1193C9.97138 17.0192 9.6417 17.8838 9.06252 18.5731C8.48335 19.2625 7.68855 19.7362 6.8067 19.9178C5.92485 20.0994 5.00753 19.9781 4.20314 19.5737C3.39875 19.1692 2.75433 18.5052 2.37413 17.6891C1.99394 16.873 1.9002 15.9524 2.10809 15.0764C2.31598 14.2004 2.81333 13.4201 3.51969 12.8618C4.22605 12.3036 5.10011 11.9999 6.00046 12H6.02246L4.91146 10H4.00046C3.73524 10 3.48089 9.89464 3.29335 9.70711C3.10581 9.51957 3.00046 9.26522 3.00046 9C3.00046 8.73478 3.10581 8.48043 3.29335 8.29289C3.48089 8.10536 3.73524 8 4.00046 8H8.00046C8.26567 8 8.52003 8.10536 8.70756 8.29289C8.8951 8.48043 9.00046 8.73478 9.00046 9C9.00046 9.26522 8.8951 9.51957 8.70756 9.70711C8.52003 9.89464 8.26567 10 8.00046 10H7.20046L8.22646 11.847L15.4805 9.127L14.5505 6.649C14.479 6.45843 14.3511 6.29419 14.1839 6.17822C14.0166 6.06225 13.818 6.00008 13.6145 6H11.0005C10.7352 6 10.4809 5.89464 10.2933 5.70711C10.1058 5.51957 10.0005 5.26522 10.0005 5Z"
        fill="currentColor"
      />
    </Svg>
  );
};

export default BikeIcon;
