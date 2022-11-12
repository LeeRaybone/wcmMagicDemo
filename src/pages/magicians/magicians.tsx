import React from 'react';

import './magicians.scss';

import { magiciansArray } from '../../info/magicians';

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
                    return (
                        <div key={magician.name} className="eventItemImageBody">
                            {magician.imageUrl && <img src={magician.imageUrl} className="magiciansItemImg" alt="eventImage" />}
                            <h3>{magician.name}</h3>
                            <div className="eventItemDescWrapper">
                                <span className="eventItemDescText">
                                    <a className="appLinks" href={magician.website1}>
                                        {magician.website1.replace('http://', '').replace('https://', '')}
                                    </a>
                                </span>
                            </div>{' '}
                            {magician.website2 && (
                                <div className="eventItemDescWrapper">
                                    <span className="eventItemDescText">
                                        {' '}
                                        <a className="appLinks" href={magician.website2}>
                                            {magician.website2.replace('http://', '').replace('https://', '')}
                                        </a>
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Magicians;
