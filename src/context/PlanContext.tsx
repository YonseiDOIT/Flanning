// @ts-nocheck
import React, {createContext, useState, useContext, useEffect} from 'react';
import {useUser} from './UserContext';
import {getUsercode} from 'src/components/common/getUserdata';
import {firestore} from 'src/utils/firebase';

// PlanContext 생성
// 일정코드 저장해놓기
const PlanContext = createContext();

// PlanProvider 컴포넌트 생성
export const PlanProvider = ({children}) => {
  const [planListData, setPlanListData] = useState(null);
  const [planDetailData, setPlanDetailData] = useState({});
  const {userData} = useUser();

  useEffect(() => {
    let unsubscribe = null;

    const fetchPlanListData = async () => {
      try {
        if (!userData?.email) {
          return;
        }

        const usercode = await getUsercode(userData.email);
        unsubscribe = firestore()
          .collection('plan')
          .where('creator', '==', usercode)
          .onSnapshot(snapshot => {
            if (snapshot.empty) {
              setPlanListData([]);
              return;
            }

            const plans = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));

            setPlanListData(plans);
          });
      } catch (e) {
        console.error('🔥 PlanContext error (fetchPlanListData):', e);
      }
    };

    fetchPlanListData();

    // 🔹 클린업 함수 (Firestore 리스너 해제)
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userData]);

  const fetchPlanDetailData = planId => {
    try {
      if (!planId) {
        return;
      }

      const unsubscribe = firestore()
        .collection('plan')
        .doc(planId)
        .collection('planList')
        .onSnapshot(snapshot => {
          const planList = snapshot.docs.reduce((acc, doc) => {
            acc[doc.id] = doc.data().plan || [];
            return acc;
          }, {});

          setPlanDetailData(prev => ({
            ...prev,
            [planId]: planList,
          }));
        });

      // 🔹 리스너 해제 함수 반환
      return unsubscribe;
    } catch (e) {
      console.error('🔥 PlanContext error (fetchPlanDetailData):', e);
    }
  };

  return (
    <PlanContext.Provider
      value={{planListData, planDetailData, fetchPlanDetailData}}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
