import React, { createContext, useEffect, useState } from 'react';
import app from '../../Firebase/Firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext(null);

const auth = getAuth(app)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);
    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = ()=>{
        return signOut(auth);
    }
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut
    }
    //*observer user auth state
        useEffect(()=>{
         const unsubscribe = onAuthStateChanged(auth, currentUser=>{
                setUser(currentUser);
                setLoading(false);
            });
            //* stop observing while unmounting
            return () =>{
                return unsubscribe();
            }
        },[])


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;