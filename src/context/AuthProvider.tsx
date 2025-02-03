import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth} from 'src/utils/firebase';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      // console.log('AuthProvider currentUser', currentUser);
      setAuthData(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await auth().signOut();
      setAuthData(null); // 로그아웃 후 상태 초기화
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  if (loading) {
    return null; // 로딩 중일 때 로딩 UI 표시 가능
  }

  return (
    <AuthContext.Provider value={{authData, signOut}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
