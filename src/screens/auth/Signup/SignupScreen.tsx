import React, {useEffect} from 'react';
import {SignupProvider} from './SignupProvider';
import SignupStack from './SignupStack';
import {initializeTensorFlow, loadTravelModel} from 'src/utils/tensorflow';
// import {initializeTensorFlow, loadTravelModel} from 'src/utils/tensorflow';
export type RootStackParam = {};

// 회원가입 스택
function SignupScreen({navigation}) {
  useEffect(() => {
    const setupTensorFlow = async () => {
      await initializeTensorFlow();
      await loadTravelModel();
      // console.log('모델 예측 준비', model);
    };
    setupTensorFlow();
  }, []);

  return (
    <SignupProvider>
      <SignupStack navigation={navigation} />
    </SignupProvider>
  );
}

export default SignupScreen;
