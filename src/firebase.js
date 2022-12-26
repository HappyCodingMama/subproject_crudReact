import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCg-EvDAKYMjSgSQbB8BlXqSfjdbc9gADk',
  authDomain: 'lets-talk-14ce3.firebaseapp.com',
  projectId: 'lets-talk-14ce3',
  storageBucket: 'lets-talk-14ce3.appspot.com',
  messagingSenderId: '14138304800',
  appId: '1:14138304800:web:e07dc87cdc767acb594f45',
  measurementId: 'G-42QEC2VCDZ',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
