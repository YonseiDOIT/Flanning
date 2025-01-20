import { firestore } from "src/utils/firebase";

//내 데이터 가져오기
export const getUserdata = async (usercode) => {
    const userCollection = await firestore().collection("users").doc(usercode).get();
    const userData = userCollection.data()
  
    return userData
  };