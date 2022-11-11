import React from 'react';
import { DateTime } from 'luxon';

import './events.scss';

import { eventsArray } from '../../info/events';

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

const Events = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>Events</h1>
            </div>
            <div className="eventBody">
                {eventsArray.map((eventYear: any) => {
                    return (
                        <>
                            <div className="eventYearWrapper">
                                <h2>{eventYear.year}</h2>
                            </div>
                            {eventYear.events.map((event: any) => {
                                console.log('event Image >>> ', event.title, event.imageUrl);
                                return (
                                    <div className={event.imageUrl ? 'eventItemImageBody' : 'eventItemBody'}>
                                        {event.imageUrl && <img src={event.imageUrl} className="eventItemImg" alt="eventImage" />}
                                        <h3>
                                            {DateTime.fromFormat(event.date, 'yyyy/MM/dd').toFormat('MMM d')}
                                            {getNumberSuffix(DateTime.fromFormat(event.date, 'yyyy/MM/dd').day)}
                                        </h3>
                                        <span className="eventItemTitle">
                                            {event.title}
                                            {event.lecture ? ' Lecture' : ''}
                                            {event.competition ? ' Competition' : ''}
                                        </span>
                                        <div className="eventItemDescWrapper">
                                            <span className="eventItemDescText">{event.description}</span>
                                        </div>
                                        {event.link && (
                                            <div className="eventItemDescWrapper">
                                                <a className="appLinks" href={event.link} target="_blank" rel="noopener noreferrer">
                                                    {event.linkText}
                                                </a>
                                            </div>
                                        )}
                                        {event.visitors && (
                                            <div className="eventItemDescWrapper">
                                                <span className="eventItemDescText">
                                                    Visiting magicians are welcome for a fee of just £5.00. The lecture starts at 8-00pm at the ECC
                                                    Sports & Social Club, Showell Road, Wolverhampton, WV10 9LE
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}{' '}
                        </>
                    );
                })}
                <div className="eventsInfoBody">
                    <div>
                        <h4>General Information</h4>
                        The above programme may be subject to change in order to accommodate lecture opportunities.
                        <br />
                        Please check our Facebook group, or the W.C.M. website www.wcm-magic.co.uk for the latest information and details about
                        lectures.
                        <br />
                        <br />
                        <b>
                            Meetings will commence at 7:45pm - Lectures will start promptly at 8:00pm.
                            <br />
                            Please note that mobile phones etc should be switched off or on silent during lectures.
                        </b>
                        <br />
                        <br />
                        Hosts are required to contact the visiting lecturer prior to the meeting and make all the necessary arrangements to ensure
                        that their visit to the W.C.M. is an enjoyable one.
                        <br />
                        Hosts are also required to submit a report on the evening's activities for publishing in "The Journal".
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Events;
