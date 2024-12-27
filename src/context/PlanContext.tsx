// @ts-nocheck
import React, {createContext, useState, useContext} from 'react';

// PlanContext 생성
// 일정코드 저장해놓기
const PlanContext = createContext();

// PlanProvider 컴포넌트 생성
export const PlanProvider = ({children}) => {
  const [plancode, setPlancode] = useState(null);

  return (
    <PlanContext.Provider value={{plancode, setPlancode}}>
      {children}
    </PlanContext.Provider>
  );
};

// plancode와 setPlancode를 사용할 수 있는 커스텀 훅
export const usePlan = () => useContext(PlanContext);
