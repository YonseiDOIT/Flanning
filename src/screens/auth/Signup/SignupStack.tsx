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
import SignupCompleteScreen from './SignupCompleteScreen';
import Step5Screen from './Step5Screen';
import Step4Screen from './Step4Screen';
import Step3Screen from './Step3Screen';
import {SignupProvider} from './SignupProvider';

export type RootStackParam = {};

const Stack = createNativeStackNavigator();

// 회원가입 스택
function SignupStack({navigation}) {
  return (
    <SignupProvider>
      <Stack.Navigator
        initialRouteName="Step1"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Step1" component={Step1Screen} />
        <Stack.Screen name="Step2" component={Step2Screen} />
        <Stack.Screen name="Step3" component={Step3Screen} />
        <Stack.Screen name="Step4" component={Step4Screen} />
        <Stack.Screen name="Step5" component={Step5Screen} />
        <Stack.Screen name="StepComplete" component={SignupCompleteScreen} />
      </Stack.Navigator>
    </SignupProvider>
  );
}

export default SignupStack;
