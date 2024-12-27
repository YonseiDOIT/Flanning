// @ts-nocheck
import React, {createContext, useState, useContext} from 'react';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트 생성
export const UserProvider = ({children}) => {
  const [usercode, setUsercode] = useState(null);

  return (
    <UserContext.Provider value={{usercode, setUsercode}}>
      {children}
    </UserContext.Provider>
  );
};

// usercode와 setUsercode를 사용할 수 있는 커스텀 훅
export const useUser = () => useContext(UserContext);
