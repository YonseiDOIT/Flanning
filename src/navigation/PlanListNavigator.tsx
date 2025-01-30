import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet, View} from 'react-native';
import LocationAddScreen from 'src/screens/planList/LocationAddScreen';
import PlanDetailScreen from 'src/screens/planList/PlanDetailScreen';
import PlanEditScreen from 'src/screens/planList/PlanEditScreen';
import PlanListScreen from 'src/screens/planList/PlanListScreen';

const Stack = createNativeStackNavigator();

const PlanNavigator = () => {
  return (
    <View style={styles.container}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="PlanList" component={PlanListScreen} />
        <Stack.Screen name="PlanEdit" component={PlanEditScreen} />
        <Stack.Screen name="PlanDetail" component={PlanDetailScreen} />
        <Stack.Screen name="LocationAdd" component={LocationAddScreen} />
      </Stack.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlanNavigator;
