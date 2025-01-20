import { firestore } from "src/utils/firebase";

//날짜별 여행 계획
export const getPlanDetail = async (day, mainPlan) => {
  const planList_data = await firestore().collection('plan').doc(mainPlan).collection('planList').get();
  let planList = [];
  planList_data.forEach(doc => {
    planList.push({ id: doc.id, ...doc.data() });
  });

  //console.log("첫날 일정",planList[day].plan)

  return planList[day].plan;
};


//일정가져오기
export const getPlan= async (usercode)=>{
  const userCollection = await firestore().collection("users").doc(usercode).get();
  const userData= userCollection.data()
  const nickname= userData?.nickname
  let planData=''
  let planData1=''
  
  if (userData?.mainPlan){
    const planCollection = await firestore().collection("plan").doc(userData.mainPlan).get();
    planData= planCollection.data()
    planData1= await getPlanDetail(0,userData.mainPlan)

    return {have:true, planData, planData1}
  }
  
  return {have:false, planData, planData1}
  
  
}
