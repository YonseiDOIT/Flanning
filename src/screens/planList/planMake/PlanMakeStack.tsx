import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackHeader from 'src/components/common/BackHeader';
import SignupContent from '../components/SignupContent';
import {useSignup} from './SignupProvider';
import {usePlanM} from './PlanMakeProvider';
import PlanMakeContent from './components/PlanMContent';
import AuthProgress from 'src/screens/auth/components/AuthProgress';

const PlanMakeStack = ({navigation}) => {
  const {planMStep} = usePlanM();

  return (
    <View style={{flex: 1}}>
      <View
        style={[planMStep > 3 ? styles.hidden : null, {paddingHorizontal: 30}]}>
        {/* 고정된 헤더 */}
        <BackHeader navigation={navigation} isSignup={true} />
        {/* 진행 상태 */}
        <AuthProgress currentStep={planMStep} />
      </View>

      {/* 콘텐츠 */}
      <PlanMakeContent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});

export default PlanMakeStack;
