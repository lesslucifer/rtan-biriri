import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBchvDiXGkas_IaTdsvXvBcCtwr97fQa6E",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "rtanbiriri.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "rtanbiriri",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "rtanbiriri.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "718708550803",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:718708550803:web:8f73d94fbd01b1c879f166"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;