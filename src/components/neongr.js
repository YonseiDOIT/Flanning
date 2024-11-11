import React from "react";
import { Text , StyleSheet} from "react-native";
import fcolor from "../assets/colors/fcolors"
import LinearGradient from 'react-native-linear-gradient';

const NeonGr = ({ children, style = 'black', colors=['#ffffff00',fcolor.green] }) => {
    return <LinearGradient style={style} start={{x:0,y:0}} end={{x:0,y:1}}
    colors={colors} locations={[0.7,0.3]}>{children}</LinearGradient>

  };
  


export default NeonGr;