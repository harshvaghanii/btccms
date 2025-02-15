import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBu719lWDKsvhTOr9A2tMo3jpZr9SDif5s",
    authDomain: "btccms-e43f8.firebaseapp.com",
    projectId: "btccms-e43f8",
    storageBucket: "btccms-e43f8.firebasestorage.app",
    messagingSenderId: "169051837029",
    appId: "1:169051837029:web:c99336cda73313ac19ec8c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
