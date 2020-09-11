import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDlffDrK8EVtNXvI5cSwpfRFP3n8J-z2dc",
  authDomain: "retro-burger-2.firebaseapp.com",
  databaseURL: "https://retro-burger-2.firebaseio.com",
  projectId: "retro-burger-2",
  storageBucket: "retro-burger-2.appspot.com",
  messagingSenderId: "437680230488",
  appId: "1:437680230488:web:5c2e437b18cd069d173a2d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
