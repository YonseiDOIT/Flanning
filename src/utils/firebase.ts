import {initializeApp} from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import {Platform} from 'react-native';
import Config from 'react-native-config';

const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: Config.FIREBASE_AUTH_DOMAIN,
  projectId: Config.FIREBASE_PROJECT_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  appId:
    Platform.OS === 'ios'
      ? Config.FIREBASE_APP_ID_IOS
      : Config.FIREBASE_APP_ID_ANDROID,
};

const app = initializeApp(firebaseConfig);

export {app, auth};
