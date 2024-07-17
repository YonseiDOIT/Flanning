import React, { createContext, useState, useContext } from 'react';

// UserContext 생성
const PlanContext = createContext();

// UserProvider 컴포넌트 생성
export const PlanProvider = ({ children }) => {
  const [plancode, setPlancode] = useState(null);

  return (
    <PlanContext.Provider value={{ plancode, setPlancode }}>
      {children}
    </PlanContext.Provider>
  );
};

// usercode와 setUsercode를 사용할 수 있는 커스텀 훅
export const usePlan = () => useContext(PlanContext);
