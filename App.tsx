// @ts-nocheck
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Login from 'src/screens/auth/Login';
// import Signup from './screens/signup';
// import IdnPass from './screens/idnpass';
// import Typecheck1 from './screens/typecheck1';
// import Typecheck2 from './screens/typecheck2';
// import TestScreen from './screens/TestScreen';
// import Appinfo from './screens/appinfo';
// import Main from './screens/main';
// import FriendList from './screens/friendlist';
// import Main1 from './screens/main1';
// import Plan from './screens/plan';
// import MMap from './screens/Map';
// import TestScreen2 from './screens/TestScreen2';
// import PlanDetail from './screens/plandetail';
// import SplashScreen from 'react-native-splash-screen';
// import {useEffect} from 'react';
// import Nickname from './screens/nickname';
// import Trvplanelist, {Trvplanlist} from './screens/trvplanlist';
// import PlanDetail1 from './screens/plandetail1';
// import AddPlan from './screens/addplan';
// import AddPlan1 from './screens/addplan1';
// import {Reviewlist} from './screens/reviewlist';
// import Reviewpage from './screens/reviewpage';
// import AddReview from './screens/addreview';
// import Alarmlist from './screens/alarmlist';
// import Addfriend from './screens/addfriend';
// import LoadingPage from './screens/loading';
import React, {useEffect} from 'react';
import AppProvider from 'src/context/AppProvider';
import HomeScreen from './src/screens/home/HomeScreen';
import SigninScreen from './src/screens/auth/Signin/SigninScreen';
import IntroScreen from './src/screens/intro/IntroScreen';
// import SignupStack from './src/screens/auth/Signup/SignupStack';
import NotificationScreen from './src/screens/notification/NotificationScreen';
import PlanListScreen from './src/screens/planList/PlanListScreen';
import ReviewScreen from './src/screens/review/ReviewScreen';
import CommunityScreen from './src/screens/community/CommunityScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SignupScreen from './src/screens/auth/Signup/SignupScreen';
import FriendListScreen from 'src/screens/home/friend/FriendListScreen';
import FriendAddScreen from 'src/screens/home/friend/FriendAddScreen';
import PlanMakeScreen from 'src/screens/planList/planMake/PlanMakeScreen';
import SettingScreen from 'src/screens/settings/SettingScreen';
import ProfileEditScreen from 'src/screens/settings/ProfileEditScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AppProvider>
      <GestureHandlerRootView>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Intro"
            screenOptions={{headerShown: false}}>
            <Stack.Screen name="Intro" component={IntroScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Friend" component={FriendListScreen} />
            <Stack.Screen name="FriendAdd" component={FriendAddScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            <Stack.Screen name="PlanList" component={PlanListScreen} />
            <Stack.Screen name="PlanMake" component={PlanMakeScreen} />
            <Stack.Screen name="Review" component={ReviewScreen} />
            <Stack.Screen name="Community" component={CommunityScreen} />
            <Stack.Screen name='Setting' component={SettingScreen}/>
            <Stack.Screen name='profileEdit' component={ProfileEditScreen}/>
            {/*
      {/*
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="idnpass" component={IdnPass} />
            <Stack.Screen name="typecheck1" component={Typecheck1} />
            <Stack.Screen name="typecheck2" component={Typecheck2} />
            <Stack.Screen name="nickname" component={Nickname} />
            <Stack.Screen name="appinfo" component={Appinfo} />

            <Stack.Screen name="test1" component={TestScreen2} />
            <Stack.Screen name="loading" component={LoadingPage} />
            {/* 아래는 일정 없는 홈과 일정 있는 홈 잠시 나눔
            <Stack.Screen name="main" component={Main} />
            <Stack.Screen name="main1" component={Main1} />
            <Stack.Screen name="friend" component={FriendList} />
            <Stack.Screen name="addfriend" component={Addfriend} />
            <Stack.Screen name="plan" component={Plan} />
            <Stack.Screen name="map" component={MMap} />
            <Stack.Screen name="plande" component={PlanDetail} />
            <Stack.Screen name="plande1" component={PlanDetail1} />
            <Stack.Screen name="alarmlist" component={Alarmlist} />
            {/* 여행 추가
            <Stack.Screen name="addplan" component={AddPlan} />
            <Stack.Screen name="addplan1" component={AddPlan1} />

            {/* 여행목록리스트
            <Stack.Screen name='planlist' component={Trvplanlist} />

            {/* 여행리뷰
            <Stack.Screen name='reviewlist' component={Reviewlist} />
            <Stack.Screen name='reviewp' component={Reviewpage} />
            <Stack.Screen name='addreview' component={AddReview} />
*/}
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </AppProvider>
  );
};

export default App;
