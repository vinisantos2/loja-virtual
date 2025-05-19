import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyADHIDZKV0eVTE18YABnqZ9x5J5w4QFSSA",
  authDomain: "loja-virtual-2cbd2.firebaseapp.com",
  projectId: "loja-virtual-2cbd2",
  storageBucket: "loja-virtual-2cbd2.firebasestorage.app",
  messagingSenderId: "648209862194",
  appId: "1:648209862194:web:7b6a9f23d70ea65bf7f62b",
  measurementId: "G-3P61481ZH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app)

export { auth, database, db, storage };
