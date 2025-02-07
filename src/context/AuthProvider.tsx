import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from 'react';
import {auth} from 'src/utils/firebase';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSigningup, setIsSigningup] = useState(false);
  const navigation = useNavigation();
  const initialized = useRef(false); // ✅ 중복 실행 방지용 useRef 추가

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      if (!isSigningup) {
        setAuthData(currentUser);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      initialized.current = false; // ✅ 언마운트 시 초기화
    };
  }, [isSigningup]); // ✅ 의존성 배열에서 isSigningup 제거

  const signOut = async () => {
    try {
      await auth().signOut();
      setAuthData(null); // ✅ 로그아웃 즉시 UI 반영
    } catch (error) {
      console.error('로그아웃 실패: ', error);
    }
  };

  if (loading) {
    return null; // ✅ 로딩 중 UI 처리 가능
  }

  return (
    <AuthContext.Provider value={{authData, signOut, setIsSigningup}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
