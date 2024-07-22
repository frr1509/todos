import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCer6GqVSSk94NmWYXYNSutp3jRQsLSM68",
    authDomain: "todosproject-5fa31.firebaseapp.com",
    projectId: "todosproject-5fa31",
    storageBucket: "todosproject-5fa31.appspot.com",
    messagingSenderId: "928788041522",
    appId: "1:928788041522:web:a83758a61849ce9ef6d12b",
    databaseURL:
        "https://todosproject-5fa31-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
