import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase"; // Ensure firebaseConfig.js exports the initialized Firebase app

const auth = getAuth(app);

// Login function
export const login = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Login Error:", error.message);
        throw error;
    }
};

// Logout function
export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout Error:", error.message);
    }
};

// Observe auth state
export const onAuthStateChange = (callback) => {
    return onAuthStateChanged(auth, callback);
};
