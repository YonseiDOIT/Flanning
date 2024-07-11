import firestore from "@react-native-firebase/firestore";



//문서 만들기
export function createplan({title}) {
  const userCollection = firestore().collection("plan").doc();
  userCollection.set({
    title:title
  })
};

export function addplan({codename,date,title,}) {
    const userCollection = firestore().collection("plan").doc(codename).collection('planlist').doc(date);
    userCollection.set({
      title:title
    })
  };
  
