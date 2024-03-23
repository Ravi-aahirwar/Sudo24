import { createContext, useContext, useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'

import { auth } from "../utils/firebase";

const authContext = createContext()

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const logOut = () => {
        return signOut(auth);
    }
    const googleSignIn = () => {
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser);
        });
        return () => {
            unsubscribe();
        };
    }, []);


    return (
        <authContext.Provider value={{
            user,
            logIn,
            signUp,
            googleSignIn,
            logOut,
        }} >
            {children}
        </authContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(authContext)
}

export { AuthProvider, authContext }