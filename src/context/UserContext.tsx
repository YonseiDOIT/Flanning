// @ts-nocheck
import React, {createContext, useState, useContext, useEffect} from 'react';
import {useAuth} from './AuthProvider';
import {firestore} from 'src/utils/firebase';
import {useNavigation} from '@react-navigation/native';
import {getUsercode} from 'src/components/common/getUserdata';

// UserContext 생성
const UserContext = createContext();

// UserProvider 컴포넌트 생성
export const UserProvider = ({children}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {authData} = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    let unsubscribe = null;

    const fetchUserData = async () => {
      if (!authData) {
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const usercode = await getUsercode(authData.email);
        const userRef = firestore().collection('users').doc(usercode);

        unsubscribe = userRef.onSnapshot(
          snapshot => {
            if (snapshot.exists) {
              setUserData(snapshot.data());
            } else {
              console.warn('유저 데이터가 존재하지 않습니다.');
              setUserData(null);
            }
          },
          error => {
            console.error('Firestore 리스너 에러:', error);
            if (error.code === 'firestore/unavailable') {
              navigation.navigate('signin');
            }
          },
        );
      } catch (error) {
        console.error('유저 데이터 가져오는 중 오류 발생:', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // 🔹 컴포넌트가 언마운트되면 리스너 해제
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [authData]);

  if (loading) {
    return null; // 로딩 중
  }

  return (
    <UserContext.Provider value={{userData}}>{children}</UserContext.Provider>
  );
};

// usercode와 setUsercode를 사용할 수 있는 커스텀 훅
export const useUser = () => useContext(UserContext);
