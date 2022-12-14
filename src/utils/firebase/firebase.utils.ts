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
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    DocumentReference,
    getDoc,
    getFirestore,
    onSnapshot,
    setDoc,
    Timestamp,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { DateTime } from 'luxon';

import { WcmEvent, WcmMagician, WcmUser } from '../wcmTypes';
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
    if (!email || !password) return null;
    const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = auth.currentUser;
    if (user) {
        updateProfile(user, {
            displayName: 'Test User WCM',
        });
    }

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
            // console.log('error creating the user', error.message);
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
            });
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

export const getAllEvents = async (): Promise<WcmEvent[]> => {
    return new Promise<WcmEvent[]>((resolve) => {
        const eventsRef = collection(firestore, `events`);
        const allEvents: WcmEvent[] = [];

        onSnapshot(eventsRef, (docsSnap) => {
            docsSnap.forEach((eventDoc) => {
                const tempEvent: WcmEvent = {
                    id: eventDoc.id,
                    date: DateTime.fromSeconds(eventDoc.data().date?.seconds),
                    description: eventDoc.data().description ?? null,
                    imageFilename: eventDoc.data().imageFilename ?? null,
                    lecture: eventDoc.data().lecture ?? false,
                    linkText: eventDoc.data().linkText ?? null,
                    linkUrl: eventDoc.data().linkUrl ?? null,
                    openNight: eventDoc.data().openNight ?? false,
                    theme: eventDoc.data().theme ?? null,
                    title: eventDoc.data().title,
                    visitors: eventDoc.data().visitors ?? false,
                };
                allEvents.push(tempEvent);
            });
            resolve(allEvents);
        });
    });
};

export const getAllMagicians = async (): Promise<WcmMagician[]> => {
    return new Promise<WcmMagician[]>((resolve) => {
        const eventsRef = collection(firestore, `magicians`);
        const allMagicians: WcmMagician[] = [];

        onSnapshot(eventsRef, (docsSnap) => {
            docsSnap.forEach((eventDoc) => {
                const tempMagician: WcmMagician = {
                    id: eventDoc.id,
                    name: eventDoc.data().name ?? null,
                    website1: eventDoc.data().website1 ?? null,
                    website2: eventDoc.data().website2 ?? null,
                    imageFilename: eventDoc.data().imageFilename ?? null,
                };
                allMagicians.push(tempMagician);
            });
            resolve(allMagicians);
        });
    });
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateEvent = async (event: WcmEvent, imageAsFile?: any): Promise<boolean | null> => {
    let docSuccess = true;

    if (event.id) {
        const docRef = doc(firestore, 'events', event.id);

        const data = {
            date: Timestamp.fromDate(event.date.toJSDate()),
            description: event.description,
            imageFilename: event.imageFilename,
            lecture: event.lecture,
            linkText: event.linkText,
            linkUrl: event.linkUrl,
            openNight: event.openNight,
            theme: event.theme,
            title: event.title,
            visitors: event.visitors,
        };

        try {
            await setDoc(docRef, data, { merge: true });
        } catch (error: any) {
            docSuccess = false;
            // console.log('error creating the user', error.message);
        }
        if (docSuccess && imageAsFile !== '') {
            const storageRef = ref(firebaseStorage, `events/${imageAsFile.name}`);

            const uploadTask = await uploadBytes(storageRef, imageAsFile);

            if (uploadTask.metadata.name === event.imageFilename) {
                return true;
            }
        }

        if (docSuccess && imageAsFile === '') {
            return true;
        }
    }
    return null;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateMagician = async (magician: WcmMagician, imageAsFile?: any): Promise<boolean | null> => {
    let docSuccess = true;

    if (magician.id) {
        const docRef = doc(firestore, 'magicians', magician.id);

        const data = {
            name: magician.name,
            website1: magician.website1,
            website2: magician.website2,
            imageFilename: magician.imageFilename,
        };

        try {
            await setDoc(docRef, data, { merge: true });
        } catch (error: any) {
            docSuccess = false;
            // console.log('error creating the user', error.message);
        }
        if (docSuccess && imageAsFile !== '') {
            const storageRef = ref(firebaseStorage, `magicians/${imageAsFile.name}`);

            const uploadTask = await uploadBytes(storageRef, imageAsFile);

            if (uploadTask.metadata.name === magician.imageFilename) {
                return true;
            }
        }

        if (docSuccess && imageAsFile === '') {
            return true;
        }
    }
    return null;
};

export const createNewDocument = async (
    location: string,
    eventItem?: WcmEvent,
    magicianItem?: WcmMagician,
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    imageAsFile?: any
): Promise<boolean | null> => {
    let tempData = null;
    let docSuccess = true;
    let imageName = '';
    if (!location) return null;
    if (eventItem) {
        tempData = {
            date: Timestamp.fromDate(eventItem.date.toJSDate()),
            description: eventItem.description,
            imageFilename: eventItem.imageFilename,
            lecture: eventItem.lecture,
            linkText: eventItem.linkText,
            linkUrl: eventItem.linkUrl,
            openNight: eventItem.openNight,
            theme: eventItem.theme,
            title: eventItem.title,
            visitors: eventItem.visitors,
        };
        if (eventItem.imageFilename) {
            imageName = eventItem.imageFilename;
        }
    }
    if (magicianItem) {
        tempData = {
            name: magicianItem.name,
            website1: magicianItem.website1,
            website2: magicianItem.website2,
            imageFilename: magicianItem.imageFilename,
        };
        if (magicianItem.imageFilename) {
            imageName = magicianItem.imageFilename;
        }
    }
    try {
        if (tempData) {
            const docRef = await addDoc(collection(firestore, location), tempData);
            docSuccess = docRef.id !== null || docRef.id !== undefined;
        }
    } catch (error: any) {
        docSuccess = false;
        // console.log('error creating the user', error.message);
    }

    if (docSuccess && imageAsFile !== '') {
        const storageRef = ref(firebaseStorage, `${location}/${imageName}`);

        const uploadTask = await uploadBytes(storageRef, imageAsFile);

        if (uploadTask.metadata.name === imageName) {
            return true;
        }
    }

    if (docSuccess && imageAsFile === '') {
        return true;
    }

    return null;
};

export const deleteDocument = async (location: string, documentId: string): Promise<boolean | null> => {
    let docDeleteSuccess = null;
    if (!location || !documentId) return null;

    try {
        const response = await deleteDoc(doc(firestore, location, documentId));
        docDeleteSuccess = true;
    } catch (error: any) {
        docDeleteSuccess = false;
        // console.log('error creating the user', error.message);
    }

    return docDeleteSuccess;
};
