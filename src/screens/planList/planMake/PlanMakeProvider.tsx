import React, {createContext, useContext, useEffect, useState} from 'react';
import globalStyles from 'src/assets/styles/globalStyles';
import {BackHandler, Platform, View} from 'react-native';
import fcolor from 'src/assets/colors/fcolors';

const PlanMContext = createContext();

export const PlanMakeProvider = ({children}) => {
  // 스텝 정보 저장
  const [planMStep, setPlanMStep] = useState(0);

  // 다음 스텝 이동
  const handleStepNext = () => setPlanMStep(planMStep + 1);

  // 회원가입 사용자 정보 저장
  const [planMData, setPlanMData] = useState({
    step1: {
      title: '', // 여행 제목
    }, // Step1의 데이터
    step2: {
      place: '', //여행 장소
    }, // Step2의 데이터
    step3: {
      dayList: [], //여행날짜
    }, // Step3의 데이터
    step4: {
      userList: [], //친구 목록
    }, // Step4의 데이터
  });

  // 여행 정보 업데이트
  const updatePlanMData = (step, data) => {
    setPlanMData(prev => ({
      ...prev,
      [step]: data,
    }));
  };

  return (
    <PlanMContext.Provider
      value={{
        planMStep,
        setPlanMStep,
        updatePlanMData,
        planMData,
        handleStepNext,
        setPlanMData,
      }}>
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? 30 : 10,
          backgroundColor: fcolor.white,
        }}>
        {children}
      </View>
    </PlanMContext.Provider>
  );
};

export const usePlanM = () => useContext(PlanMContext);
