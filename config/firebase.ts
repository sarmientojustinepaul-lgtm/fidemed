import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

if (typeof global.btoa === 'undefined') {
  global.btoa = (str: string) => Buffer.from(str, 'binary').toString('base64');
}
if (typeof global.atob === 'undefined') {
  global.atob = (str: string) => Buffer.from(str, 'base64').toString('binary');
}

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "fidemed.firebaseapp.com",
  projectId: "fidemed",
  storageBucket: "fidemed.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:754603555526:web:e12eafa1963848f30f75c7"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth: any;
if (typeof window !== 'undefined') {
  auth = getAuth(app);
} else {
  try {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } catch {
    auth = getAuth(app);
  }
}

const db = getFirestore(app);

export { app, auth, db };

