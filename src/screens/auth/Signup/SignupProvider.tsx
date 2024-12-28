import React, {createContext, useContext, useState} from 'react';

const SignupContext = createContext();

export const SignupProvider = ({children}) => {
  // 회원가입 스텝 정보 저장
  const [signupStep, setSignupStep] = useState(0);

  // 회원가입 다음 스텝 이동
  const handleStepNext = () => setSignupStep(signupStep + 1);

  // 회원가입 사용자 정보 저장
  const [signupData, setSignupData] = useState({
    step1: {
      overFourteen: false,
      termsAgree: false,
      privacyPolicy: false,
      personalInfo: false,
      marketing: false,
    }, // Step1의 데이터
    step2: null, // Step2의 데이터
    step3: null, // Step3의 데이터
    step4: null, // Step4의 데이터
  });

  // 회원가입 사용자 정보 업데이트
  const updateSignupData = (step, data) => {
    setSignupData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  return (
    <SignupContext.Provider
      value={{
        signupStep,
        setSignupStep,
        updateSignupData,
        signupData,
        handleStepNext,
      }}>
      {children}
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
