import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import BText from 'src/components/common/BText';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import fcolor from 'src/assets/colors/fcolors';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import LinearGradient from 'react-native-linear-gradient';
import NeonGr from 'src/components/neongr';
import MText from 'src/components/common/MText';
import RText from 'src/components/common/RText';
import Step1Screen from './Step1Screen';
import Step2Screen from './Step2Screen';

export type RootStackParam = {};

const Stack = createNativeStackNavigator();

// 회원가입 스택
function SignupStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="Step1"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Step1" component={Step1Screen} />
      <Stack.Screen name="Step2" component={Step2Screen} />
    </Stack.Navigator>
  );
}

export default SignupStack;
