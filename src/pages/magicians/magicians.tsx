import React from 'react';

import './magicians.scss';

import { magiciansArray } from '../../info/magicians';

import Magician from './magician/magician';

const Magicians = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>Contact details for the Wolverhampton Circle of Magicians members</h1>
            </div>
            <div className="bodyText">
                <p>
                    If you are looking for Magical Entertainment for your special event, then please contact us so we can put you in touch with
                    mystifying magicians from your local area.
                    <br />
                    Alternatively you can click on the links below to visit the websites of our professional entertainers.
                </p>
            </div>
            <div className="eventBody">
                {magiciansArray.map((magician: any) => {
                    return <Magician key={magician.name} magician={magician} />;
                })}
            </div>
        </div>
    );
};

export default Magicians;
