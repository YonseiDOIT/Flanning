import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';
import fcolor from '../assets/colors/fcolors';
import LinearGradient from 'react-native-linear-gradient';

const NeonGr = ({
  children,
  style = 'black',
  colors = ['#ffffff00', fcolor.green],
}) => {
  const locations = Platform.select({
    ios: [0.5, 0.5],
    android: [0.5, 0.0],
  });

  return (
    <LinearGradient
      style={style}
      start={{x: 0, y: 0}}
      end={{x: 0, y: 1}}
      colors={colors}
      locations={locations}>
      {children}
    </LinearGradient>
  );
};

export default NeonGr;
