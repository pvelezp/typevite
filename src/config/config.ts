import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/firestore"
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyD6Z7cPfNMmcvE7kJGcV8o7n45dCTiydAw",
  authDomain: "type-vite.firebaseapp.com",
  projectId: "type-vite",
  storageBucket: "type-vite.appspot.com",
  messagingSenderId: "200185363274",
  appId: "1:200185363274:web:657e6dc0a8df8fbcccdfb3",
  measurementId: "G-20ZH82G0MH"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = getFirestore(app)
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;