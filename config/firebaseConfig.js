// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfvysN7VtLXqE_dMP2ccxMbUMlS0BLowI",
  authDomain: "fir-auth-81b80.firebaseapp.com",
  projectId: "fir-auth-81b80",
  storageBucket: "fir-auth-81b80.appspot.com",
  messagingSenderId: "302442519290",
  appId: "1:302442519290:web:0367564114adc43b82c743",
  measurementId: "G-K36KB2X5GZ",
};
const app = initializeApp(firebaseConfig);
// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };
