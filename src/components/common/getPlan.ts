import {firestore} from 'src/utils/firebase';
import {getDay} from './dataManagement';

//날짜별 여행 계획
export const getPlanDetail = async (day, mainPlan) => {
  const planList_data = await firestore()
    .collection('plan')
    .doc(mainPlan)
    .collection('planList')
    .get();
  let planList = [];

  planList_data.forEach(doc => {
    planList.push({id: doc.id, ...doc.data()});
  });

  //console.log("첫날 일정",planList[day].plan)

  return planList[day].plan;
};

//일정가져오기
export const getPlan = async mainPlan => {
  const planCollection = await firestore()
    .collection('plan')
    .doc(mainPlan)
    .get();
  const planData = planCollection.data();
  const dayNumber = getDay(planData.dayList);
  const planData1 = await getPlanDetail(dayNumber - 1, mainPlan);

  return {dayNumber, planData, planData1};
};

export const havePlan = async usercode => {
  const userCollection = await firestore()
    .collection('users')
    .doc(usercode)
    .get();
  const userData = userCollection.data();

  if (userData?.mainPlan) {
    return {have: true, mainPlan: userData.mainPlan};
  } else {
    return {have: false, mainPlan: ''};
  }
};
