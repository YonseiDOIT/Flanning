import React from 'react';
import { Button, View } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};



function TestScreen ()  {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();
  
  const addFruitToDatabase = () => {
    // Firebase Realtime Database의 특정 경로에 데이터 쓰기
    database()
    .ref('/fruits/apple')
    .set('사과')
    .then(() => console.log('Data set.'))
    .catch(error => console.error('Error writing to Firebase', error));

  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="데이터 추가!"
        onPress={addFruitToDatabase}
      />
      <Button
        title="메인으로"
        onPress={() => navigation.navigate('main')}
      />
    </View>
  );
};

export default TestScreen;
