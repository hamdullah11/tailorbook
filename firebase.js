// Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwipnorT4nNbxaDmhDaxt-f2YK_NhGqaU",
  authDomain: "lwtailorbook.firebaseapp.com",
  projectId: "lwtailorbook",
  storageBucket: "lwtailorbook.appspot.com",
  messagingSenderId: "1043026075840",
  appId: "1:1043026075840:web:aa99f3cf7498f8bd9e4d25",
  storageBucket: "gs://lwtailorbook.appspot.com/",
};

// Initialize Firebase
// if (!firebase.apps.length) {
// export const app = initializeApp(firebaseConfig);
// }

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
