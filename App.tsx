// @ts-nocheck
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';
import AppProvider from 'src/context/AppProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AppNavigator from 'src/navigation/AppNavigator';
import 'react-native-get-random-values';
import SignupScreen from './src/screens/auth/Signup/SignupScreen';
import FriendListScreen from 'src/screens/home/friend/FriendListScreen';
import FriendAddScreen from 'src/screens/home/friend/FriendAddScreen';
import PlanMakeScreen from 'src/screens/planList/planMake/PlanMakeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <GestureHandlerRootView>
        <AppNavigator />
      </GestureHandlerRootView>
    </AppProvider>
  );
};

export default App;
