import React from 'react';
import {Text, StyleSheet} from 'react-native';

const RText = ({children, style, color = '#171719', fontSize = 13}) => {
  return (
    <Text style={[styles.text, style, {color: color}, {fontSize}]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard-Regular', // 여기서 원하는 폰트 패밀리 설정
  },
});

export default RText;
