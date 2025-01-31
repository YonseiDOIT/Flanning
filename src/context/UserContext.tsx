// @ts-nocheck
import React, {createContext, useState, useContext, useEffect} from 'react';
import {useAuth} from './AuthProvider';
import {firestore} from 'src/utils/firebase';
import {useNavigation} from '@react-navigation/native';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트 생성
export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuth();

  useEffect(() => {
    if (currentUser) {
      const fetchUserData = async () => {
        try {
          const userQuery = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userQuery.exists) {
            setUserData(userQuery.data());
          }
        } catch (error) {
          // 🔹 Firestore 서비스가 다운되었거나 사용 불가능한 경우 로그인 페이지 이동
          // if (error.code === 'firestore/unavailable') {
          //   navigation.navigate('signin');
          // }
        } finally {
          setLoading(false);
        }
      };

      fetchUserData();
    } else {
      setUserData(null);
      setLoading(false);
    }
  }, [currentUser]);

  if (loading) {
    return null; // 로딩 중
  }

  return (
    <UserContext.Provider value={{userData}}>{children}</UserContext.Provider>
  );
};

// usercode와 setUsercode를 사용할 수 있는 커스텀 훅
export const useUser = () => useContext(UserContext);
