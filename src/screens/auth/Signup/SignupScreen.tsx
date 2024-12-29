import React from 'react';
import {SignupProvider} from './SignupProvider';
import SignupStack from './SignupStack';

export type RootStackParam = {};

// 회원가입 스택
function SignupScreen({navigation}) {
  return (
    <SignupProvider>
      <SignupStack navigation={navigation} />
    </SignupProvider>
  );
}

export default SignupScreen;
