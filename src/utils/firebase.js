import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyAGdXiMfw8GTYQ33VxrcokrnHbw6O_nBCE",
    authDomain: "sudo24-cd190.firebaseapp.com",
    projectId: "sudo24-cd190",
    storageBucket: "sudo24-cd190.appspot.com",
    messagingSenderId: "674395979478",
    appId: "1:674395979478:web:bcb3071d7cb00dfc5ed377",
    measurementId: "G-D38M8SE2NW"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };