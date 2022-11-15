import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../members.scss';

const SeasonInfo = (): JSX.Element => {
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
            <h1>Season 2022 - 2023</h1>
            <div className="appSubBodyContainer">
                <h5>President:</h5>
                <div className="subbodyText">
                    Dave Taylor
                    <br />
                    Tel: (01902) 863851
                    <br />
                    Mobile: 07775847209
                    <br />
                    <a className="appLinks" href="mailTo:daaytay400@gmail.com" target="_blank" rel="noopener noreferrer">
                        daaytay400@gmail.com
                    </a>
                </div>
                <h5>Vice-President:</h5>
                <div className="subbodyText">
                    Robert Doyle
                    <br />
                    Mobile: 07970542999
                    <br />
                    <a className="appLinks" href="mailTo:robertdoyle108@hotmail.co.uk" target="_blank" rel="noopener noreferrer">
                        robertdoyle108@hotmail.co.uk
                    </a>
                </div>
                <h5>Immediate Past President:</h5>
                <div className="subbodyText">
                    Sue Oakley
                    <br />
                </div>
                <h5>Honorary Members:</h5>
                <div className="subbodyText">Donald Bevan, Malcolm Cudmore, Bob Taylor</div>
                <h5>Life Members:</h5>
                <div className="subbodyText">Gordon Astley, George Willoughby</div>
                <h5>Meeting Place</h5>
                <div className="subbodyText">
                    <a
                        className="appLinks"
                        href="https://www.google.co.uk/maps/place/The+ECC+Sports+%26+Social+Club/@52.6051902,-2.1269638,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9183d34918503661!8m2!3d52.6051706!4d-2.1269903"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        ECC Sports & Social Club, Showell Road, Wolverhampton, WV10 9LU
                    </a>
                </div>

                <h4>Officers</h4>
                <h5>Secretary:</h5>
                <div className="subbodyText">
                    Sue Oakley
                    <br />
                    Tel: (01902) 247078
                    <br />
                    Mobile: 07912421038
                    <br />
                    <a className="appLinks" href="mailTo:sueoakley61@gmail.com" target="_blank" rel="noopener noreferrer">
                        sueoakley61@gmail.com
                    </a>
                </div>
                <h5>Treasurer:</h5>
                <div className="subbodyText">
                    Dave Taylor
                    <br />
                    Tel: (01902) 863851
                    <br />
                    Mobile: 07775847209
                    <br />
                    <a className="appLinks" href="mailTo:daaytay400@gmail.com" target="_blank" rel="noopener noreferrer">
                        daaytay400@gmail.com
                    </a>
                </div>
                <h5>Membership Secretary:</h5>
                <div className="subbodyText">
                    Dave Oakley
                    <br />
                    Tel: (01902) 247078
                    <br />
                    Mobile: 07951271305
                    <br />
                    <a className="appLinks" href="mailTo:david@davidoakley.co.uk" target="_blank" rel="noopener noreferrer">
                        david@davidoakley.co.uk
                    </a>
                </div>
                <h5>Councillors:</h5>
                <div className="subbodyText">Jay Adkins; Shane McDermott; Kevin Sheldon; Steph Wootton</div>
                <h5>Welfare Officer:</h5>
                <div className="subbodyText">
                    Shane McDermott=
                    <br />
                    <a className="appLinks" href="mailTo:narna08@hotmail.com" target="_blank" rel="noopener noreferrer">
                        narna08@hotmail.com
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SeasonInfo;
