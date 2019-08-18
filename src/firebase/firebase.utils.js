import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyA0mb71slXadE9YFiPS9sDRZPr32vC3_YY",
    authDomain: "thakur-db.firebaseapp.com",
    databaseURL: "https://thakur-db.firebaseio.com",
    projectId: "thakur-db",
    storageBucket: "",
    messagingSenderId: "401390780655",
    appId: "1:401390780655:web:4778f41c052b5a34"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const createUserProfileDocument = async (userAuth, ...additionalData) => {

    if(!userAuth) {
        return;
    }
    const userRef = firestore.doc(`/users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
        await userRef.set({    //API call to add new user
            displayName,
            email,
            createdAt,
            ...additionalData
            })
        } catch(error){
        console.log('Error creating user', error.message);
        }
    }
    return userRef;
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        resolve(userAuth);
        }, reject);
    });
};

//Config for google sign in
//const provider = new firebase.auth.GoogleAuthProvider();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;