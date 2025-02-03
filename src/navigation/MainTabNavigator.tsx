import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomBar from 'src/components/common/BottomBar';
import {View, StyleSheet} from 'react-native';
import HomeScreen from 'src/screens/home/HomeScreen';
import ReviewScreen from 'src/screens/review/ReviewScreen';
import PlanNavigator from './PlanListNavigator';
import PlanMakeScreen from 'src/screens/planList/planMake/PlanMakeScreen';
import FriendListScreen from 'src/screens/home/friend/FriendListScreen';
import NotificationScreen from 'src/screens/notification/NotificationScreen';
import FriendAddScreen from 'src/screens/home/friend/FriendAddScreen';

const Stack = createNativeStackNavigator();

const MainTabNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Plan" component={PlanNavigator} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="Friend" component={FriendListScreen} />
        {/* <Stack.Screen name="FriendAdd" component={FriendAddScreen} /> */}
        <Stack.Screen name="Notification" component={NotificationScreen} />
        <Stack.Screen name="PlanMake" component={PlanMakeScreen} />
        {/* <Stack.Screen name="Profile" component={ProfileScreenWithBottomBar} /> */}
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainTabNavigator;
