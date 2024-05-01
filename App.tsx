import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Login from './screens/login';
import  Signup  from './screens/signup';
import  IdnPass  from './screens/idnpass';
import Typecheck1 from './screens/typecheck1';
import Typecheck2 from './screens/typecheck2';
import TestScreen from './screens/TestScreen';
import Appinfo from './screens/appinfo';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="idnpass" component={IdnPass} />
        <Stack.Screen name="typecheck1" component={Typecheck1} />
        <Stack.Screen name="typecheck2" component={Typecheck2} />
        <Stack.Screen name="appinfo" component={Appinfo} />
                {/* 추가 스크린은 여기에 계속해서 등록하면 됩니다. */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
