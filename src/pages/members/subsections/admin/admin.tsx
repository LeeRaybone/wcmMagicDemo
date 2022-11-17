import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Tab, Tabs } from '@mui/material';

import EventAdmin from './eventsAdmin/eventsAdmin';
import UserAdmin from './userAdmin/userAdmin';

const Admin = (): JSX.Element => {
    const navigate = useNavigate();
    const [tabIndex, setTabIndex] = useState(0);

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

    return (
        <div>
            <div className="appSubBodyContainer">
                <Tabs value={tabIndex} onChange={handleTabChange} orientation="horizontal">
                    <Tab label="User Admin" />
                    <Tab label="Event Admin" />
                    <Tab label="Admin" />
                </Tabs>
                {tabIndex === 0 && (
                    <Box>
                        <UserAdmin />
                    </Box>
                )}
                {tabIndex === 1 && (
                    <Box>
                        <EventAdmin />
                    </Box>
                )}
            </div>
        </div>
    );
};

export default Admin;
