import {initializeApp} from 'firebase/app';
import {collection, getFirestore} from 'firebase/firestore';
import {envVars} from '../lib/environments';

const firebaseConfig = {
  apiKey: envVars.API_KEY,
  authDomain: envVars.AUTH_DOMAIN,
  projectId: envVars.PROJECT_ID,
  storageBucket: envVars.STORAGE_BUCKET,
  messagingSenderId: envVars.MESSAGING_SENDER_ID,
  appId: envVars.APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const store = collection(db, envVars.DB_PATH);
