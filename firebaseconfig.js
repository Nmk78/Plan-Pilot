import { getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKyBNU6fFRTi-kK0cSHuQ6hOKRLEMhf1Q",
  authDomain: "plan-pilot-d86f1.firebaseapp.com",
  projectId: "plan-pilot-d86f1",
  storageBucket: "plan-pilot-d86f1.appspot.com",
  messagingSenderId: "167164672245",
  appId: "1:167164672245:web:fd5763c5a5e1539b71edbc",
  measurementId: "G-58NCD8QZ10",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore
const db = getFirestore(app);

// Initialize Authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const storage = getStorage();

// Export the services
export { app, db, auth, storage };
