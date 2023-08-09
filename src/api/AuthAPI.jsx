import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from "firebase/auth";

import { auth } from "../firebaseConfig";

export const LoginAPI = (email, password) => {
    try {
        let response = signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        return err;
    }
}


export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (err) {
        return err;
    }
}


export const GoogleSignInAPI = () => {
    try {
        const googleProvider = new GoogleAuthProvider();
        let response = signInWithPopup(auth, googleProvider);
        return response;
    } catch (err) {
        return err;
    }
};


export const onLogOut = () => {
    try {
        signOut(auth);
    } catch (err) {
        return err;
    }
}