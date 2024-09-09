import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyAKV7sQXnR4tsjn4DVMk2zCwHtSOe-Tugk',
  authDomain: 'dreamext-b5d14.firebaseapp.com',
  projectId: 'dreamext-b5d14',
  storageBucket: 'dreamext-b5d14.appspot.com',
  messagingSenderId: '920360685618',
  appId: '1:920360685618:web:e21d23b0496f3a62022c2b',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
