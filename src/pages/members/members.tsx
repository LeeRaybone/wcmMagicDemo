import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

import './members.scss';

import { WcmUser } from '../../App';
import { AuthContext } from '../../contexts/auth.context';
import { getUserInfo } from '../../utils/firebase/firebase.utils';

import Account from './subsections/account/account';
import Admin from './subsections/admin/admin';
import Misc from './subsections/misc/misc';
import SeasonInfo from './subsections/seasonInfo/seasonInfo';

const Members = (): JSX.Element => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);
    const [currentUser, setCurrentUser] = useState<WcmUser | null>(null);
    const user = useContext(AuthContext);

    const handleTabChange = (event: any, newTabIndex: number): void => {
        setTabIndex(newTabIndex);
    };

    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token');
        if (authToken) {
            navigate('/members');
        }

        if (!authToken) {
            navigate('/home');
        }
    }, []);

    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
            if (user) {
                const data = await getUserInfo(user?.uid);
                setCurrentUser(data);
            }
        };
        // call the function
        fetchUserData()
            // make sure to catch any error
            .catch(console.error);
    }, [user]);

    return (
        <div className="appMainContainer">
            <h1>Wolverhampton Circle of Magicians - Members Area</h1>
            <div className="flexRow">
                <Tabs value={tabIndex} onChange={handleTabChange} orientation="vertical">
                    <Tab label="Info" />
                    <Tab label="Account" />
                    <Tab label="Misc" />
                    {currentUser?.admin && <Tab label="Admin" />}
                </Tabs>
                {tabIndex === 0 && (
                    <Box>
                        <SeasonInfo />
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <Account currentUser={currentUser} />
                    </Box>
                )}
                {tabIndex === 2 && (
                    <Box>
                        <Misc />
                    </Box>
                )}
                {tabIndex === 3 && (
                    <Box>
                        <Admin />
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Members;
