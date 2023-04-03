import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBeU4abrvitWhuXBu_EUTSmddq5dq6pfzU",
  authDomain: "task-list-e9c1c.firebaseapp.com",
  projectId: "task-list-e9c1c",
  storageBucket: "task-list-e9c1c.appspot.com",
  messagingSenderId: "36153596936",
  appId: "1:36153596936:web:4a9e1ded2b68e2f83385bd",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
