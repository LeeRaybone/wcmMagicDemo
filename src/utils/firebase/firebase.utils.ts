import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword,
    updateProfile,
    User,
    UserCredential,
} from 'firebase/auth';
import { collection, doc, DocumentData, DocumentReference, getDoc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { DateTime } from 'luxon';

import { WcmUser } from '../../App';
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
export const firestore = getFirestore();
export const firebaseStorage = getStorage();
// const usersCollection = collection(firestore, 'users');

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | null> => {
    console.log('file: firebase.utils.ts ~ line 29 ~ signInAuthUserWithEmailAndPassword ~ password', password);
    console.log('file: firebase.utils.ts ~ line 29 ~ signInAuthUserWithEmailAndPassword ~ email', email);
    if (!email || !password) return null;
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
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

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {}): Promise<DocumentReference<DocumentData> | null> => {
    if (!userAuth) return null;

    const userRef = collection(firestore, `users`);
    const docRef = doc(firestore, 'users', userAuth.uid);
    const userSnapshot = await getDoc(docRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(doc(userRef, userAuth.uid), {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error: any) {
            console.log('error creating the user', error.message);
        }
    }

    return docRef;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | null> => {
    if (!email || !password) return null;

    return createUserWithEmailAndPassword(auth, email, password);
};

export const getAllUsers = async (): Promise<WcmUser[]> => {
    return new Promise<WcmUser[]>((resolve) => {
        const userRef = collection(firestore, `users`);
        const allUsers: WcmUser[] = [];

        onSnapshot(userRef, (docsSnap) => {
            docsSnap.forEach((userDoc) => {
                const tempUser: WcmUser = {
                    email: userDoc.data().email,
                    name: userDoc.data().displayName,
                    dateJoined: DateTime.fromSeconds(userDoc.data().createdAt?.seconds),
                    createdAt: DateTime.fromFormat(userDoc.data().dateJoined, 'dd/MM/yyyy'),
                    admin: userDoc.data().admin,
                    fullMember: userDoc.data().fullMember,
                };
                allUsers.push(tempUser);
                console.log('tempUser >>> ', { ...tempUser });
            });
            console.log('users >>> ', { ...allUsers });
            resolve(allUsers);
        });
    });
};

export const getUserInfo = async (userId: string): Promise<WcmUser | null> => {
    const docRef = doc(firestore, 'users', userId);
    const docSnap = await getDoc(docRef);
    return new Promise<WcmUser>((resolve) => {
        if (docSnap) {
            const tempUser: WcmUser = {
                userId: userId,
                email: docSnap?.data()?.email,
                name: docSnap?.data()?.displayName,
                dateJoined: DateTime.fromSeconds(docSnap?.data()?.createdAt?.seconds),
                createdAt: DateTime.fromFormat(docSnap?.data()?.dateJoined, 'dd/MM/yyyy'),
                admin: docSnap?.data()?.admin,
                fullMember: docSnap?.data()?.fullMember,
            };
            resolve(tempUser);
        }
    });
};

export const updateUserPassword = async (newPassword: string): Promise<boolean | null> => {
    const user = auth.currentUser;
    if (user) {
        updatePassword(user, newPassword)
            .then(() => {
                return true;
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_error) => {
                return false;
            });
    }
    return null;
};

export const updateUserEmailAndName = async (email: string, displayName: string | undefined): Promise<boolean | null> => {
    const user = auth.currentUser;
    if (user) {
        const docRef = doc(firestore, 'users', user?.uid);

        const data = {
            email: email,
            displayName: displayName ?? '',
        };

        setDoc(docRef, data, { merge: true });

        updateEmail(user, email)
            .then(() => {
                return true;
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .catch((_error) => {
                return false;
            });
    }
    return null;
};
