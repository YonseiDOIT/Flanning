// @ts-check
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from 'src/screens/auth/SignInScreen';
import MainTabs from './MainTabs';
import {useAuth} from 'src/context';
import IntroScreen from 'src/screens/intro/IntroScreen';
import SigninScreen from 'src/screens/auth/Signin/SigninScreen';
import SignupScreen from 'src/screens/auth/Signup/SignupScreen';
import HomeScreen from 'src/screens/home/HomeScreen';
import NotificationScreen from 'src/screens/notification/NotificationScreen';
import PlanListScreen from 'src/screens/planList/PlanListScreen';
import ReviewScreen from 'src/screens/review/ReviewScreen';
import CommunityScreen from 'src/screens/community/CommunityScreen';
import {View} from 'react-native';
import MainTabNavigator from './MainTabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  // const user = useAuth();
  const authData = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!authData ? (
        <>
          <Stack.Screen name="Intro" component={IntroScreen} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="Main" component={MainTabNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
