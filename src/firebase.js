import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import firebaseConfig from "./firebaseConfig.json";
 
firebase.initializeApp(firebaseConfig);

export const auth= firebase.auth();

const provider= new firebase.auth.GoogleAuthProvider();


export const signInWithGoogle= ()=>{ auth.signInWithPopup(provider) };

export default firebase;