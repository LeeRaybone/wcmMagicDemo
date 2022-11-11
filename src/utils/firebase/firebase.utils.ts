import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, UserCredential, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCAzBEUkIdiwSdJzNT7m7IA-CcSO0A6Hgw',
    authDomain: 'wolves-circle-magicians.firebaseapp.com',
    projectId: 'wolves-circle-magicians',
    storageBucket: 'wolves-circle-magicians.appspot.com',
    messagingSenderId: '970969385567',
    appId: '1:970969385567:web:2fc98100e16a78733f69ea',
    measurementId: 'G-Y2FSBEZVZN',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//const provider = ;

export const auth = getAuth();
const firestore = getFirestore();
const usersCollection = collection(firestore, 'users');

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | null> => {
    console.log('file: firebase.utils.ts ~ line 29 ~ signInAuthUserWithEmailAndPassword ~ password', password);
    console.log('file: firebase.utils.ts ~ line 29 ~ signInAuthUserWithEmailAndPassword ~ email', email);
    if (!email || !password) return null;
    let userCredential: UserCredential;

    userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
        updateProfile(user, {
            displayName: 'Test User WCM',
        });
    }
    console.log('file: firebase.utils.ts ~ line 33 ~ signInAuthUserWithEmailAndPassword ~ signInResponse', userCredential);

    return userCredential;
};

export const signOut = async (): Promise<void> => {
    sessionStorage.clear();
    await auth.signOut();
};
