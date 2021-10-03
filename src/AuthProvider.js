import { createContext, useEffect, useState } from "react";
import { auth, firestore } from "./firebase";

export const authContext= createContext();

const AuthProvider= (props)=>{
    let [user,setUser]= useState(null);
    let [loading, setLoading]= useState(true);

    useEffect(()=>{
        let unsub= auth.onAuthStateChanged( async (currUser)=>{
            if(currUser)
            {
                let {displayName, email, uid , photoURL}= currUser;
                setUser({displayName, email, uid , photoURL});

                const docRef= firestore.collection("users").doc(uid);
                const docSnapShot = await docRef.get();
                if(!docSnapShot.exists) docRef.set({displayName, email, photoURL});
            }
            else setUser(null);

            setLoading(false);
        });

        return ()=>{ unsub() };
    },[]);

    return  <authContext.Provider value={user}>
                {!loading && props.children}
            </authContext.Provider>;
};

export default AuthProvider;