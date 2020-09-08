import * as firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAtBxJ1ioW8rg1VaJnb2AJM0RXiYBx6t4I",
  authDomain: "retro-burger.firebaseapp.com",
  databaseURL: "https://retro-burger.firebaseio.com",
  projectId: "retro-burger",
  storageBucket: "retro-burger.appspot.com",
  messagingSenderId: "963751896495",
  appId: "1:963751896495:web:5cc842a16efe908bc6bb5a",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
