import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAODf1MJh-2ag4IvpnjCeMpg70jrnziLbU",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "vishra-88f8f.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "vishra-88f8f",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "vishra-88f8f.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "545040551097",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:545040551097:web:591204fac6f053e5c79f68",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-EYWFDFZ8YL"
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId
);

const app = !getApps().length
  ? (isFirebaseConfigured ? initializeApp(firebaseConfig) : null)
  : getApp();

export const db = app ? getFirestore(app) : null;
