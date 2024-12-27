import React from 'react';
import {UserProvider, PlanProvider} from './index';

// 모든 Provider를 감싸는 컴포넌트
const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <UserProvider>
      <PlanProvider>{children}</PlanProvider>
    </UserProvider>
  );
};

export default AppProvider;
