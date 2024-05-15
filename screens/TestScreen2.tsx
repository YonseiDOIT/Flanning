import React from 'react';
import { Button, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};



function TestScreen2 ()  {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor: 'blue' }}>
      <Button
        title="데이터 추가!"
      />
      <Button
        title="메인으로"
        onPress={() => navigation.navigate('main')}
      />
    </View>
  );
};

export default TestScreen2;
