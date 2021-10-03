import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import firebaseConfig from "./firebaseConfig.json";


firebase.initializeApp(firebaseConfig);

export const storage= firebase.storage();
export const firestore = firebase.firestore();
export const auth= firebase.auth();

const provider= new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle= ()=>{ auth.signInWithPopup(provider) };

export default firebase;