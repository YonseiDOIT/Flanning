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



export function createUser({email}) {
  const usercode=makeid(5);
  const userCollection = firestore().collection("users").doc(usercode);
  userCollection.set({
    email:email
  })
  return (usercode);
};

export async function getUser(id) {
  const doc = await userCollection.doc(id).get();
  return doc.data();
}