import {getApps, initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import Config from 'react-native-config';
import storage from '@react-native-firebase/storage';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  databaseURL: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Platform.OS === 'ios'
      ? Config.FIREBASE_APP_ID_IOS
      : Config.FIREBASE_APP_ID_ANDROID,
};

if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}

export {auth, firestore, firebase, storage};
