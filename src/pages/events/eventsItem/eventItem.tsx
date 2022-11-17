import React, { useEffect, useState } from 'react';

import '../events.scss';

import { WcmEvent } from '../../../utils/wcmTypes';
import { getImage } from '../../../utils/wcmUtils/image.utils';

const getNumberSuffix = (num: number): string => {
    const th = 'th';
    const rd = 'rd';
    const nd = 'nd';
    const st = 'st';

    if (num === 11 || num === 12 || num === 13) return th;

    const lastDigit = num.toString().slice(-1);

    switch (lastDigit) {
        case '1':
            return st;
        case '2':
            return nd;
        case '3':
            return rd;
        default:
            return th;
    }
};
export interface EventItemProps {
    event: WcmEvent;
}
const EventItem = ({ event }: EventItemProps): JSX.Element => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchImage = async (): Promise<void> => {
            if (event.imageFilename) {
                const tempImage = await getImage('events/', event.imageFilename);
                setImage(tempImage);
            }
        };

        fetchImage().catch(console.error);
    }, [event]);

    return (
        <div className={event.imageFilename ?? event.imageFilename ? 'eventItemImageBody' : 'eventItemBody'}>
            {event.imageFilename && <img src={image} className="eventItemImg" />}
            <h4>
                {event.date.toFormat('MMM d')}
                {getNumberSuffix(event.date.day)}
            </h4>
            <span className="eventItemTitle">
                {event.title}
                {event.lecture ? ' Lecture' : ''}
            </span>
            <div className="eventItemTheme">{event.theme}</div>
            <div className="eventItemDescWrapper">
                <span className="eventItemDescText">{event.description}</span>
            </div>
            {event.linkText && (
                <div className="eventItemDescWrapper">
                    <a className="appLinks" href={event.linkUrl} target="_blank" rel="noopener noreferrer">
                        {event.linkText}
                    </a>
                </div>
            )}
            {event.visitors && (
                <div className="eventItemDescWrapper">
                    <span className="eventItemDescText">
                        Visiting magicians are welcome for a fee of just £5.00. The lecture starts at 8-00pm at the ECC Sports & Social Club, Showell
                        Road, Wolverhampton, WV10 9LE
                    </span>
                </div>
            )}
        </div>
    );
};

export default EventItem;
