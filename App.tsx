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
import FriendList from './screens/friendlist';
import Main1 from './screens/main1';
import Plan from './screens/plan';
import MMap from './screens/Map'
import TestScreen2 from './screens/TestScreen2';
import PlanDetail from './screens/plandetail';
// import SplashScreen from 'react-native-splash-screen';
import { useEffect } from 'react';
import Nickname from './screens/nickname';
import Trvplanelist, { Trvplanlist } from './screens/trvplanlist';
import PlanDetail1 from './screens/plandetail1';
import AddPlan from './screens/addplan';
import AddPlan1 from './screens/addplan1';

  


const Stack = createNativeStackNavigator();

const App=()=> {
  
  return (
    
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="signup" component={Signup} />
        <Stack.Screen name="idnpass" component={IdnPass} />
        <Stack.Screen name="typecheck1" component={Typecheck1} />
        <Stack.Screen name="typecheck2" component={Typecheck2} />
        <Stack.Screen name="nickname" component={Nickname} />
        <Stack.Screen name="appinfo" component={Appinfo} />
        <Stack.Screen name="test" component={TestScreen} />
        <Stack.Screen name="test1" component={TestScreen2} />
        {/* 아래는 일정 없는 홈과 일정 있는 홈 잠시 나눔 */}
        <Stack.Screen name="main" component={Main} /> 
        <Stack.Screen name="main1" component={Main1} /> 
        <Stack.Screen name="friend" component={FriendList} />
        <Stack.Screen name="plan" component={Plan} />
        <Stack.Screen name="map" component={MMap} />
        <Stack.Screen name="plande" component={PlanDetail} />
        <Stack.Screen name="plande1" component={PlanDetail1} />
        {/* 여행 추가 */}
        <Stack.Screen name="addplan" component={AddPlan} />
        <Stack.Screen name="addplan1" component={AddPlan1} />
        
        {/* 여행목록리스트 */}
        <Stack.Screen name='planlist' component={Trvplanlist}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
