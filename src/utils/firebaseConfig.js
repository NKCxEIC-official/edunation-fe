// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAauCjjOLMcAPEve9veXIkHosKWjVzdKqo',
  authDomain: 'edunation-6e4ef.firebaseapp.com',
  databaseURL: 'https://edunation-6e4ef-default-rtdb.firebaseio.com',
  projectId: 'edunation-6e4ef',
  storageBucket: 'edunation-6e4ef.appspot.com',
  messagingSenderId: '113491577737',
  appId: '1:113491577737:web:18e482ef07231deec6ef58',
  measurementId: 'G-VT0G35HZ1N',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const realtimeDb = getDatabase(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
