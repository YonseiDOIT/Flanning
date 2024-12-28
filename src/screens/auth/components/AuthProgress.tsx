import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import fcolor from 'src/assets/colors/fcolors';

const AuthProgress = ({currentStep}) => {
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
      {Array.from({length: 4}, (_, idx) => (
        <View
          key={`step-${idx}`}
          style={{
            width: 10,
            height: 10,
            borderRadius: 50,
            marginHorizontal: 5,
            backgroundColor: idx < currentStep + 1 ? fcolor.blue : fcolor.gray2,
          }}
        />
      ))}
    </View>
  );
};

export default AuthProgress;
