import React from 'react';
import {UserProvider, PlanProvider, AuthProvider} from './index';
import {NavigationContainer} from '@react-navigation/native';

// 모든 Provider를 감싸는 컴포넌트
const AppProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UserProvider>
          <PlanProvider>{children}</PlanProvider>
        </UserProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppProvider;
