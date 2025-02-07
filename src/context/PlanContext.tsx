// @ts-nocheck
import React, {createContext, useState, useContext, useEffect} from 'react';
import {useUser} from './UserContext';
import {getUsercode} from 'src/components/common/getUserdata';
import {firestore} from 'src/utils/firebase';
import {useAuth} from './AuthProvider';

// PlanContext 생성
// 일정코드 저장해놓기
const PlanContext = createContext();

// PlanProvider 컴포넌트 생성
export const PlanProvider = ({children}) => {
  const [planListData, setPlanListData] = useState(null);
  const [planDetailData, setPlanDetailData] = useState({});
  const [creatorPlans, setCreatorPlans] = useState([]);
  const [joinUserPlans, setJoinUserPlans] = useState([]);
  const {userData} = useUser();
  const {authData} = useAuth();

  useEffect(() => {
    let unsubscribeCreator;
    let unsubscribeJoinUser;

    const fetchPlanListData = async () => {
      if (!userData?.email) {
        return;
      }

      const usercode = await getUsercode(userData.email);

      unsubscribeCreator = firestore()
        .collection('plan')
        .where('creator', '==', usercode)
        .onSnapshot(snapshot => {
          const plans = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setCreatorPlans(plans);
        });

      unsubscribeJoinUser = firestore()
        .collection('plan')
        .where('userList', 'array-contains', usercode)
        .onSnapshot(snapshot => {
          const plans = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
          setJoinUserPlans(plans);
        });
    };

    fetchPlanListData();

    return () => {
      if (unsubscribeCreator) {
        unsubscribeCreator();
      }
      if (unsubscribeJoinUser) {
        unsubscribeJoinUser();
      }
    };
  }, [userData]);

  // creatorPlans와 joinUserPlans를 병합하여 planListData 업데이트
  useEffect(() => {
    const mergedPlans = [...creatorPlans, ...joinUserPlans];
    // 중복 제거 (문서 id를 기준)
    const uniquePlans = Array.from(
      new Map(mergedPlans.map(plan => [plan.id, plan])).values(),
    );
    // 예시로 dayList의 첫 번째 날짜를 기준으로 정렬
    uniquePlans.sort(
      (a, b) =>
        new Date(a.dayList[0]).getTime() - new Date(b.dayList[0]).getTime(),
    );
    setPlanListData(uniquePlans);
  }, [creatorPlans, joinUserPlans]);

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
      console.error('상세 불러오기 에러:', e);
    }
  };

  const updatePlanData = async (planId, planData) => {
    try {
      const batch = firestore().batch();
      const planRef = firestore()
        .collection('plan')
        .doc(planId)
        .collection('planList');

      // 🔹 planData 객체의 키(날짜)들을 순회하면서 batch에 업데이트 추가
      Object.keys(planData).forEach(date => {
        const docRef = planRef.doc(date);
        batch.set(docRef, {plan: planData[date]}, {merge: true});
      });

      await batch.commit();
    } catch (error) {
      console.log('업데이트 실패', error);
    }
  };

  const updatePlanState = async (planId, date, idx) => {
    try {
      const planRef = await firestore()
        .collection('plan')
        .doc(planId)
        .collection('planList')
        .doc(date);
      idx = idx - 1;
      const doc = await planRef.get();
      if (!doc.exists) {
        console.error('문서가 존재하지 않습니다.');
        return;
      }

      const planData = doc.data().plan || [];

      if (planData[idx].state === 1) {
        planData[idx].state = 2;
      } else if (planData[idx].state === 2) {
        planData[idx].state = 1;
      }
      await planRef.update({plan: planData});
      return true;
    } catch (e) {
      console.error('상태 업데이트 실패', e);
      return false;
    }
  };

  const deletePlanData = async planId => {
    try {
      const planDocRef = firestore().collection('plan').doc(planId);
      const planListRef = planDocRef.collection('planList');

      // planList 서브컬렉션의 모든 문서를 가져옴
      const snapshot = await planListRef.get();
      const batch = firestore().batch();

      // 서브컬렉션의 각 문서를 배치 삭제에 추가
      snapshot.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      await planDocRef.delete();

      setPlanListData(prevPlans =>
        prevPlans ? prevPlans.filter(plan => plan.id !== planId) : [],
      );
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  return (
    <PlanContext.Provider
      value={{
        planListData,
        planDetailData,
        fetchPlanDetailData,
        updatePlanData,
        deletePlanData,
        updatePlanState,
      }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);
