import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { Animated, PanResponder, View, StyleSheet, Dimensions, Text } from 'react-native';
import fcolors from '../src/assets/colors/fcolors';

const { height: screenHeight } = Dimensions.get('window');  // 디바이스의 화면 높이

export type RootStackParamList = {
  Home: undefined;
  Test: undefined;
};

const TestScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const heightAnim = useRef(new Animated.Value(500)).current; // 초기 높이 값 설정

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        if (gesture.dy < 0) {
          let newHeight = 500 - gesture.dy;
          if (newHeight > screenHeight) newHeight = screenHeight; // 높이 제한
          heightAnim.setValue(newHeight);
        }
      },
      onPanResponderRelease: () => {
        if (heightAnim._value >= screenHeight) {
          // 높이가 화면 높이 이상일 때 다음 화면으로 넘어가기
          navigation.navigate('test1'); // 'Test'는 다음 화면의 route name으로 교체 필요
        } else {
          // 그렇지 않을 경우 원래 크기로 복귀
          Animated.spring(heightAnim, {
            toValue: 500,
            useNativeDriver: false
          }).start();
        }
      }
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:fcolors.black, height:200,width:'100%'}}>
        <Text>와와와</Text>
      </View>
      <Animated.View
        style={[styles.box, { height: heightAnim }]}
        {...panResponder.panHandlers}
      >
        <Text style={styles.text}>Swipe up to fill the screen</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  box: {
    width: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    fontSize: 16
  }
});

export default TestScreen;
