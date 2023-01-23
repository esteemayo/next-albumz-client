import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'albums-cc519.firebaseapp.com',
  projectId: 'albums-cc519',
  storageBucket: 'albums-cc519.appspot.com',
  messagingSenderId: '218675999859',
  appId: '1:218675999859:web:bbdd327c0a8298ec462606'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
