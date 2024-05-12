import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Login from './screens/login';
import  Signup  from './screens/signup';
import  IdnPass  from './screens/idnpass';
import Typecheck1 from './screens/typecheck1';
import Typecheck2 from './screens/typecheck2';
import TestScreen from './screens/TestScreen';
import Appinfo from './screens/appinfo';
import Main from './screens/main';
import FriendList from './screens/frienlist';
import Main1 from './screens/main1';
import Plan from './screens/plan';


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
        <Stack.Screen name="test" component={TestScreen} />
        {/* 아래는 일정 없는 홈과 일정 있는 홈 잠시 나눔 */}
        <Stack.Screen name="main" component={Main1} /> 
        <Stack.Screen name="main1" component={Main} /> 
        <Stack.Screen name="friend" component={FriendList} />
        <Stack.Screen name="plan" component={Plan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
