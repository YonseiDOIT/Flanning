import React, {createContext, useContext, useEffect, useState} from 'react';
import globalStyles from 'src/assets/styles/globalStyles';
import {BackHandler, View} from 'react-native';

const SignupContext = createContext();

export const SignupProvider = ({children}) => {
  // 회원가입 스텝 정보 저장
  const [signupStep, setSignupStep] = useState(0);

  // 회원가입 다음 스텝 이동
  const handleStepNext = () => setSignupStep(signupStep + 1);

  // 회원가입 사용자 정보 저장
  const [signupData, setSignupData] = useState({
    step1: {
      overFourteen: false, // 1. 만 14세 이상 이용 가능 동의
      termsAgree: false, // 2. 서비스 이용약관 동의
      privacyPolicy: false, // 3. 개인정보 처리방침 동의
      personalInfo: false, // 4. 개인정보 수집 및 이용 동의
      marketing: false, // 5. 마케팅 수신 동의
    }, // Step1의 데이터
    step2: {
      email: '', // 사용자 이메일
      emailVerify: false,
      password: '', // 사용자 패스워드
      passwordRe: '', // 사용자 패스워드 확인
    }, // Step2의 데이터
    step3: {
      nickname: '', // 사용자 닉네임
      nicknameVerify: false,
      introduction: '', // 사용자 한 줄 소개
      userImage: null, // 사용자 프로필이미지 저장 경로
    }, // Step3의 데이터
    step4: {
      tripType: 0, // 선호하는 활동 유형
      tripReason: 0, // 여행의 주요 동기
      tripLocationType: 0, // 선호하는 장소 유형
      tripCompanionsType: 0, // 평소 여행 동행 인원
      tripActivityType: 0, // 여행 주도성
      tripPlanningType: 0, // 여행 계획 스타일
      tripScheduleType: 0, // 하루 일정 스타일
      tripNewPerson: 0, // 새로운 만남에 대한 적극도
    }, // Step4의 데이터
    step5: {
      type: '', // 사용자 여행 스타일
      title: '', // 사용자 여행 스타일 제목
      description: '', // 사용자 여행 스타일 설명
      img: null, // 사용자 여행 스타일 이미지
    }, // Step5의 데이터
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
        setSignupData,
      }}>
      <View style={globalStyles.container}>{children}</View>
    </SignupContext.Provider>
  );
};

export const useSignup = () => useContext(SignupContext);
