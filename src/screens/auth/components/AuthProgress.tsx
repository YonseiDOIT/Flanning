import React, {useEffect, useRef} from 'react';
import {View, Text, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';

const AuthProgress = ({currentStep}) => {
  const animatedValues = useRef(
    [...Array(4)].map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    animatedValues.forEach((animValue, index) => {
      Animated.timing(animValue, {
        toValue: index <= currentStep ? 1 : 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    });
  }, [currentStep]);

  const backgroundColors = animatedValues.map(animValue =>
    animValue.interpolate({
      inputRange: [0, 1],
      outputRange: [fcolor.gray2, fcolor.blue],
    }),
  );

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
      }}>
      {backgroundColors.map((bgColor, idx) => (
        <Animated.View
          key={`step-${idx}`}
          style={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 4,
            backgroundColor: bgColor,
          }}
        />
      ))}
    </View>
  );
};

export default AuthProgress;
