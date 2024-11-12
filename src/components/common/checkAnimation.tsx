import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // 사용하는 아이콘 패키지에 맞춰 수정

export function CheckAnimation({ size = 22, color = 'blue', duration = 300, delay = 0 }) {
    const revealAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // width 애니메이션을 설정하여 아이콘이 왼쪽에서 오른쪽으로 서서히 나타나게 함
      Animated.timing(revealAnim, {
        toValue: size, // 아이콘의 전체 크기만큼 나타나도록
        duration: duration,
        delay: delay, // 지연 시간 설정
        useNativeDriver: false, // width 조정을 위해 useNativeDriver는 false로 설정
      }).start();
    }, [duration, size, delay]);
  
    return (
      <View style={{ width: size, height: size, overflow: 'hidden' }}>
        <Animated.View style={{ width: revealAnim, opacity: 1 }}>
          <Icon name="check" size={size} color={color} />
        </Animated.View>
      </View>
    );
}
