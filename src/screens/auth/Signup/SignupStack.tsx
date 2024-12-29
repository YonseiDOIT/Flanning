import React from 'react';
import {StyleSheet, View} from 'react-native';
import BackHeader from 'src/components/common/BackHeader';
import AuthProgress from '../components/AuthProgress';
import SignupContent from '../components/SignupContent';
import {useSignup} from './SignupProvider';

const SignupStack = ({navigation}) => {
  const {signupStep} = useSignup();

  return (
    <View style={{flex: 1}}>
      <View style={signupStep > 3 ? styles.hidden : null}>
        {/* 고정된 헤더 */}
        <BackHeader navigation={navigation} isSignup={true} />
        {/* 진행 상태 */}
        <AuthProgress currentStep={signupStep} />
      </View>

      {/* 콘텐츠 */}
      <SignupContent navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});

export default SignupStack;
