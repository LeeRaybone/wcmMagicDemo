import React from 'react';

import './magicians.scss';

import davepitt from '../../assets/magicians/dave-pitt.jpeg';
import davestevenson from '../../assets/magicians/dave-stevenson.jpeg';
import davidoakley from '../../assets/magicians/david-oakley.jpeg';
import jimmycarlo from '../../assets/magicians/jimmy-carlo.jpeg';
import jonmarshall from '../../assets/magicians/jon-marshall.jpeg';
import markharrington from '../../assets/magicians/mark-harrington.jpeg';
import ronpopple from '../../assets/magicians/ron-popple.jpeg';
import russstyler from '../../assets/magicians/russ-styler.jpeg';
import seancarpenter from '../../assets/magicians/sean-carpenter.jpeg';
import traciehughes from '../../assets/magicians/tracie-hughes.jpeg';
import { magiciansArray } from '../../info/magicians';

const Magicians = (): JSX.Element => {
    const imageUrl = (imageName: string): any => {
        switch (imageName) {
            case 'mark-harrington':
                return markharrington;
            case 'jon-marshall':
                return jonmarshall;
            case 'jimmy-carlo':
                return jimmycarlo;
            case 'ron-popple':
                return ronpopple;
            case 'dave-pitt':
                return davepitt;
            case 'dave-stevenson':
                return davestevenson;
            case 'david-oakley':
                return davidoakley;
            case 'russ-styler':
                return russstyler;
            case 'sean-carpenter':
                return seancarpenter;
            case 'tracie-hughes':
                return traciehughes;

            default:
                return undefined;
        }
    };

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
                            {magician.imageUrl && <img src={imageUrl(magician.imageUrl)} className="magiciansItemImg" alt="eventImage" />}
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
