
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth , GoogleAuthProvider } from "firebase/auth";
import { getApp, getApps, initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyC6X2VT-U9w0be4ryh8bLbM31cIUYDWqHQ",
  authDomain: "zalo-clone-8792f.firebaseapp.com",
  projectId: "zalo-clone-8792f",
  storageBucket: "zalo-clone-8792f.appspot.com",
  messagingSenderId: "117390540419",
  appId: "1:117390540419:web:7e5f8efac5fdb8f9d325b6",
  measurementId: "G-B29X24B4MQ"
};


const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// const analytics = getAnalytics(app);

export  const db = getFirestore(app);

export  const auth = getAuth(app);

export const provider = new GoogleAuthProvider();