import { initializeApp } from 'firebase/app';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import config from '../../firebase.json'; //firebase.json위치

const app = initializeApp(config);
const auth = getAuth(app);



export const getCurrentUser = () => {
  const { uid, displayName, email } = auth.currentUser;
  return { uid, name : displayName, email};
};


export const login = async ({email, password}) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
};

export const logout = async () => {
  return await auth.signOut();
};

export const signup = async ({name, email, password}) => {
  
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
const user = userCredential.user;
await user.updateProfile({
  displayName: name,
  // photoURL: "some_photo_url" // 프로필 사진을 추가하려면
});
  return user;
 
};