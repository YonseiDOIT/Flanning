import firestore, { FieldValue } from "@react-native-firebase/firestore";

//유저 쪽에 plan 아이디 기록
export function userplan({title,date1,date2,memo}) {
  const userCollection = firestore().collection("plan").doc();
  userCollection.set({
    title:title,
    startday:date1,
    endday:date2,
    memo:memo
  })
};

//문서 만들기
export function createplan({title,date1,date2,memo,userid}) {
  const userCollection = firestore().collection("plan").doc();
  userCollection.set({
    title:title,
    startday:date1,
    endday:date2,
    memo:memo
  })

  const userCollection1 = firestore().collection("users").doc(userid);
  


  const newDocID = userCollection.id;
  console.log('아이디!!!!!!!!!!!1')
  console.log(newDocID)
  userCollection1.update("plan", FieldValue.arrayUnion(newDocID))
  userCollection1.update("main", newDocID)
  .catch((error) => {
    console.error("Error updating document: ", error);
    // 문서가 없는 경우 새로 생성하는 코드
   
  });;

  return newDocID
};


export function addplan({codename,title,location,locationtyp,icon,content,date}) {
  const userCollection = firestore().collection("plan").doc(codename).collection('planlist').doc(date);
  userCollection.update({
    plantext: firestore.FieldValue.arrayUnion({
      location: location,
      locationtyp:locationtyp,
      content: [icon, content],
      state: ['진행 예정']
    })
  }).catch((error) => {
    console.error("Error updating document: ", error);
    // 문서가 없는 경우 새로 생성하는 코드
    userCollection.set({
      title:title,
      plantext: [
        {
          location: location,
          locationtyp: locationtyp,
          content: [icon, content],
          state: ['진행 예정']
        }
      ]
    });
  });
};
  
