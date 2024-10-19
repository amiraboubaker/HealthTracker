// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfvysN7VtLXqE_dMP2ccxMbUMlS0BLowI",
  authDomain: "fir-auth-81b80.firebaseapp.com",
  projectId: "fir-auth-81b80",
  storageBucket: "fir-auth-81b80.appspot.com",
  messagingSenderId: "302442519290",
  appId: "1:302442519290:web:0367564114adc43b82c743",
  measurementId: "G-K36KB2X5GZ"
};
const app = initializeApp(firebaseConfig);
// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };
