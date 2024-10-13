import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkkh2F62XjJFA1xvP_0CMvTok9OrjQ1h4",
    authDomain: "todosproject-42c2f.firebaseapp.com",
    databaseURL:
        "https://todosproject-42c2f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todosproject-42c2f",
    storageBucket: "todosproject-42c2f.appspot.com",
    messagingSenderId: "411528833784",
    appId: "1:411528833784:web:26752370e42e91f51a290d",
};
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
