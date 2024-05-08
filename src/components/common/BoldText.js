import React from "react";
import { Text , StyleSheet} from "react-native";

const BoldText = ({ children, style, color = 'black' }) => {
    return <Text style={[styles.text, style, { color: color }]}>{children}</Text>;
  };
  
const styles = StyleSheet.create({
    text: {
      fontFamily: 'Pretendard-SemiBold', // 여기서 원하는 폰트 패밀리 설정
      fontSize: 25, // 기본 폰트 사이즈
    },
});

export default BoldText;