import React from 'react';
import {useSignup} from '../Signup/SignupProvider';
import Step1Screen from '../Signup/Step1Screen';
import Step2Screen from '../Signup/Step2Screen';
import Step3Screen from '../Signup/Step3Screen';
import Step4Screen from '../Signup/Step4Screen';
import Step5Screen from '../Signup/Step5Screen';
import SignupCompleteScreen from '../Signup/SignupCompleteScreen';

const SignupContent = ({navigation}) => {
  const {signupStep} = useSignup();

  switch (signupStep) {
    case 0:
      return <Step1Screen />;
    case 1:
      return <Step2Screen />;
    case 2:
      return <Step3Screen />;
    case 3:
      return <Step4Screen />;
    case 4:
      return <Step5Screen />;
    case 5:
      return <SignupCompleteScreen navigation={navigation} />;
    default:
      return <Step1Screen />;
  }
};

export default SignupContent;
