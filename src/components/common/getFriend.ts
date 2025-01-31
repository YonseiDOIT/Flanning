import { FieldValue } from "@react-native-firebase/firestore";
import { Alert } from "react-native";
import { firestore } from "src/utils/firebase";


//친구 추가
export const addFriend = async (friendcode, usercode) => {
  const usersCollection = await firestore().collection('users').doc(friendcode).get();
  const db = usersCollection.data();
  // 해당 친구가 있는지 확인
  if (db) {
    // 추가
    const userCollection = firestore().collection("users").doc(usercode);
    userCollection.update("friend", FieldValue.arrayUnion(friendcode));

    //상대 쪽에도 추가
    const userCollection1 = firestore().collection("users").doc(friendcode);
    userCollection1.update("friend", FieldValue.arrayUnion(usercode));

    // 새 친구를 추가하고 상태를 업데이트
    Alert.alert(db.nickname, '친구 요청을 보냈어요!\n수락할 때까지 조금만 기다려주세요 😊');
  } else {
    console.log("없음");
    Alert.alert('', '해당 친구코드는 없는 코드입니다.');
  }
};

//친구 가져오기
export const getFriend = async (usercode) => {
  const userCollection = await firestore().collection("users").doc(usercode).get();
  const userData = userCollection.data()
  const friendId= userData.friend

  let updatedUsers = [];
  for (let id = 0; id < friendId.length; id++) {
    let fCode= friendId[id]
    const usersCollection = await firestore().collection('users').doc(fCode).get();
    const db = usersCollection.data();
    updatedUsers.push({ ...db,code:fCode});
  }

  return updatedUsers;

}

// 친구 삭제 코드
export const deleteFriend = (frdcode,usercode) => {
  console.log(frdcode,usercode)
  const userCollection =firestore().collection("users").doc(usercode);
  userCollection.update({
    friend: FieldValue.arrayRemove(frdcode)
  });
  const userCollection1 =firestore().collection("users").doc(frdcode);
  userCollection1.update({
    friend: FieldValue.arrayRemove(usercode)
  });
  
};