import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth} from 'src/utils/firebase';

const AuthContext = createContext(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(currentUser => {
      setAuthData(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // 로딩 중일 때 로딩 UI 표시 가능
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
