import firestore from "@react-native-firebase/firestore";

export function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}



export function createUser({ email }) {
  const usercode = makeid(5);
  const userCollection = firestore().collection("users").doc(usercode);
  userCollection.set({
    email: email
  })
  return (usercode);
};

export async function getUser(id) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}

export async function getUserid(email) {
  const userCollection = await firestore().collection("users").get();
  console.log('되겠죠?')
  let userList = [];
  userCollection.docs.forEach(doc => {
    const data = doc.data();
    userList.push({
      id: doc.id,
      email: data.email
    });
  });
  console.log(email)
  console.log('되겠죠???')
  console.log(userList)

  let usercode='';
  for (let i = 0; i < userList.length; i++) {
    if (email === userList[i].email) {
      usercode = userList[i].id;
      console.log(usercode)
      break;
    }
  }

  
  const usersCollection1 = await firestore().collection('users').doc(usercode).get();
  const db = usersCollection1.data();
  console.log('maincode')
  console.log(db.main)
  let main=db.main
  
  return {usercode, main};
}


export async function getMain(usercode){
  const usersCollection1 = await firestore().collection('users').doc(usercode).get();
  const db = usersCollection1.data();
  console.log('maincode')
  console.log(db.main)
  let main=db.main
  
  return main;

}