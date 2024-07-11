import React, { useRef, useState } from 'react';
import { Animated, Button, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import fcolors from '../../assets/colors/fcolors';
import MText from './MText';

const BoxGr = ({name= '진행 완료'}) => {
  //상태에 따라 변환
  if (name === '진행 완료') {
    sty= styles.statebox_g
    font_color=fcolors.gray4
  }else if (name === "진행 예정"){
    sty= styles.statebox_bl
    font_color=fcolors.blue
  }else if (name === "진행 중"){
    sty= styles.statebox_skyb
    font_color='#A6C8FF'
  }else if (name === "예약 전"){
    sty= styles.statebox_Or
    font_color=fcolors.orange
  }else if (name === "예약 확정"){
    sty= styles.statebox_ng
    font_color='#A2D900'
  }

  return (
    
    <View style={sty}>
      
        <MText fontSize={12} color={font_color}>
          {(() => {
                    if (name === "진행 완료") return "진행 완료";
                    else if (name === "진행 중") return "진행 중";
                    else if (name === "진행 예정") return "진행 예정";
                    else if (name === "예약 전") return "예약 전";
                    else return "예약 확정";
                })()}
        </MText>
    </View>
  );
};

const styles = StyleSheet.create({

    statebox_g: {
      width: 55,
      height: 23,
      marginRight: 5,
      backgroundColor: fcolors.gray1,
      borderWidth: 1,
      borderColor: fcolors.gray4,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:5
    },
    statebox_Or: {
      width: 55,
      height: 23,
      marginRight: 5,
      backgroundColor: '#FEF3EA',
      borderWidth: 1,
      borderColor: fcolors.orange,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:5
    },
    statebox_bl: {
      width: 55,
      height: 23,
      marginRight: 5,
      backgroundColor: '#E8F1FF',
      borderWidth: 1,
      borderColor: fcolors.blue,
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:5
    },
    statebox_skyb: {
      width: 55,
      height: 23,
      marginRight: 5,
      backgroundColor: '#F3F7FF',
      borderWidth: 1,
      borderColor: '#A6C8FF',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:5
    },
    statebox_ng: {
      width: 55,
      height: 23,
      marginRight: 5,
      backgroundColor: '#FAFFED',
      borderWidth: 1,
      borderColor: '#A2D900',
      borderRadius: 4,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom:5
    }
});

export default BoxGr;