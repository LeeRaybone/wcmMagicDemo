import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { auth } from '../utils/firebase/firebase.utils';

export const AuthContext = createContext<User | null>(null);

export interface AuthContextProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthContextProps): any => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            setUser(firebaseUser);
        });

        return unsubscribe;
    }, []);

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
