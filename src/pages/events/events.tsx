import React, { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

import './events.scss';

import { getAllEvents } from '../../utils/firebase/firebase.utils';
import { WcmEvent, WcmEventYear } from '../../utils/wcmTypes';

import EventItem from './eventItem/eventItem';

const Events = (): JSX.Element => {
    const [eventsArray, setEventsArray] = useState<WcmEventYear[]>([]);
    const [startYear] = useState(2022);
    const [endYear] = useState(2023);

    useEffect(() => {
        const fetchEventData = async (): Promise<void> => {
            const data = await getAllEvents();
            const filteredData = data
                .filter(
                    (d) =>
                        d.date >= DateTime.fromFormat(`30/06/${startYear}`, 'dd/MM/yyyy') &&
                        d.date <= DateTime.fromFormat(`01/08/${endYear}`, 'dd/MM/yyyy')
                )
                .sort((a: WcmEvent, b: WcmEvent): number => (a.date > b.date ? 1 : -1));
            console.log('file: events.tsx ~ line 35 ~ fetchEventData ~ data', { ...filteredData });
            const startYearEvents = filteredData.filter((d) => d.date.year === startYear);
            const endYearEvents = filteredData.filter((d) => d.date.year === endYear);
            const groupedEvents = [
                {
                    year: startYear,
                    events: startYearEvents,
                },
                {
                    year: endYear,
                    events: endYearEvents,
                },
            ];
            setEventsArray(groupedEvents);
        };
        // call the function
        fetchEventData()
            // make sure to catch any error
            .catch(console.error);
    }, []);

    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>Events</h1>
            </div>
            <div className="eventBody">
                {eventsArray.map((eventYear: any) => {
                    return (
                        <>
                            <h2>{eventYear.year}</h2>
                            {eventYear.events.map((event: WcmEvent) => {
                                return <EventItem event={event} />;
                            })}{' '}
                        </>
                    );
                })}
                <div className="bodyText">
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
