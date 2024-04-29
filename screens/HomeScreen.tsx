import { Button, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParam = {
  Home: undefined;
  Test: undefined;
};

export const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black', fontSize: 30 }}>HomeScreen</Text>
      <Button 
        title="Go to TestScreen" 
        onPress={() => navigation.navigate('Test')} 
        />
    </View>
  );
};