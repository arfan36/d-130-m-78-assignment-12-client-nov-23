import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, set_user] = useState(null);
    const [loading, set_loading] = useState(true);

    // create user with email and password
    const createUser = (email, password) => {
        set_loading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // signIn with email and password
    const signIn = (email, password) => {
        set_loading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // update profile
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    };

    // log out
    const logOut = () => {
        set_loading(true);
        return signOut(auth);
    };

    // observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log('inside auth state changed', currentUser);
            set_user(currentUser);
            set_loading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        createUser,
        signIn,
        updateUser,
        logOut,
        user,
        loading,
        set_loading
    };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;