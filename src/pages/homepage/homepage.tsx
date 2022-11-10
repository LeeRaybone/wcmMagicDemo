import React from 'react';

import './homepage.scss';

import cards from '../../assets/spreadCards.jpg';
const Homepage = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <h1>Welcome to the WCM Website</h1>
            <div className="appMainBodyContainer">
                <span className="mainBody">
                    <img src={cards} className="cardsImage" alt="cardsImage" />
                    The <b>WCM</b> is a local magic society, made up of over fifty magicians who take pride in being members of one of the most active
                    and successful magical societies in the country.
                    <br />
                    <br />
                    Our members range from amateur magicians to award winning professional magic acts, representing the full diversity of the magic
                    arts: children's entertainers, clowns, mentalists, close up workers, stage acts, local magical dealers and stand-up comedy acts.
                    The WCM prides itself on an active magical membership, with several international and national award winning acts within its
                    ranks.
                    <br />
                    <br />
                    We meet for lectures and to share magic on alternate Wednesdays from 7:45pm, at the
                    <a
                        className="appLinks"
                        href="https://www.google.co.uk/maps/place/The+ECC+Sports+%26+Social+Club/@52.6051902,-2.1269638,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9183d34918503661!8m2!3d52.6051706!4d-2.1269903"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {' '}
                        ECC Sports & Social Club, Showell Road, Wolverhampton, WV10 9LU
                    </a>
                    . These meetings are normally for members only so we can protect our secrets and continue to baffle and awe our audiences. The
                    Wolverhampton Circle is happy to welcome other visiting magicians to its meetings, in some cases, a nominal door fee will be
                    applied.
                    <br />
                    <br />
                    Our Events page lists the upcoming events for the year including our guest lecturers, social occasions, shows, and magic
                    competitions.
                    <br />
                    <br />
                    We do run a number of OPEN EVENTS including our Stage and Close Up Magic Competitions as public events for those wishing to see
                    some of the best local talents in magic.
                    <br />
                    <br />
                    <div className="divider" />
                    <br />
                    <br />
                    We are constantly on the look out for new members, so if you love magic and want to meet with like minded magicians, then get in
                    touch with our membership secretary who will help you to join our great meeting of magical minds.
                    <br />
                    <br />
                    If you are looking for Magical Entertainment for your special event, then please contact us so we can put you in touch with
                    mystifying magicians from your local area. We have members from Wolverhampton, Birmingham, Stafford, Cannock, Shrewsbury and all
                    over the Midlands. Either see our members page or email the President direct to find out more.
                    <br />
                    <br />
                </span>
            </div>
        </div>
    );
};

export default Homepage;
