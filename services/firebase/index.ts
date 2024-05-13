// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
// import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const config = {
  apiKey: "AIzaSyBUgu6_wWrvYWxysznMlJxBFsLxRVwMVn8",
  authDomain: "kantar-rs--storage-fdbc957rx8z.firebaseapp.com",
  projectId: "kantar-rs--storage-fdbc957rx8z",
  storageBucket: "kantar-rs--storage-fdbc957rx8z.appspot.com",
  messagingSenderId: "1068952793361",
  appId: "1:1068952793361:web:3019e360e74f1c96259cb0",
  measurementId: "G-52BPMXY1YV",
};
// Initialize Firebase
export const app = 0 < getApps().length ? getApp() : initializeApp(config);

// Initialize Cloud Firestore and get a reference to the service
// export const auth = getAuth(app);
export const db = getFirestore(app);
// export const storage = getStorage(app);
