import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getDatabase, ref, set } from "firebase/database";

function writeUserData(name,  email, password) {
  const db = getDatabase();
  set(ref(db, 'users/' + name), {
    name:name,
    email: email,
    password:password
  });
}
const firebaseConfig = {
    apiKey: "AIzaSyApVzc_gJ0aiPyhQjRa6loift8KE0zGnoA",
    authDomain: "websitemedicinelogintest.firebaseapp.com",
    projectId: "websitemedicinelogintest",
    storageBucket: "websitemedicinelogintest.appspot.com",
    messagingSenderId: "493300403761",
    appId: "1:493300403761:web:2f01fff1983bb107210f10",
    measurementId: "G-ZRXDDXY4E5",
    databaseURL:"https://websitemedicinelogintest-default-rtdb.firebaseio.com"
  };
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);