import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../members.scss';

const Misc = (): JSX.Element => {
    const navigate = useNavigate();

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
                <h3>Coming Soon....</h3>
            </div>
        </div>
    );
};

export default Misc;
