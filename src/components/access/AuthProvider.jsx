import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../../firebase/firebase_init";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {

    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth(app);

    const createUser = (email,password) =>{
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password) =>{
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logoutUser = () =>{
        return signOut(auth);
    }
    const googleLogin = () =>{
        return signInWithPopup(auth,googleProvider);
    }
    const updateUser = (name,imgurl) =>{
        return updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:imgurl
        })
    }

    const authInfo ={
        createUser,
        loginUser,
        logoutUser,
        googleLogin,
        user,
        loading,
        updateUser
    }
    
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
              setUser(currentUser)
            } else {
              setUser(null);
            }
            setLoading(false);
          });

        return ()=>{
            unsubscribe();
        }
    },[])

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;