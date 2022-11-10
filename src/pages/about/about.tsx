import React from 'react';

import './about.scss';

const About = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <h1>About the Wolverhampton Circle of Magicians</h1>
            <div className="appMainBodyContainer">
                <body className="App-body">
                    <p>
                        <h2>History</h2>
                        <img src={'http://www.wcm-magic.co.uk/images/cake.png'} className="image" alt="cakeImage" />
                        <p>
                            After the Second World War, the interest in Magic throughout the country took hold again and Magical Societies began to
                            spring up with great regularity and Wolverhampton was no exception. Whilst there were neighbouring clubs - the British
                            Magical Society in Birmingham and the Staffordshire Magical Society in Wednesbury - a group of magicians led by Donald
                            Crombie, local Wolverhampton solicitor and Past President of the BMS and the IBM, first met on 19th November 1947 and
                            founded the Wolverhampton Circle of Magicians. Jasper Maskelyne accepted the honorary position of Vice President. In the
                            first year the subscription and joining fee were both half a guinea (52.5p!) which probably accounts for the fact that the
                            Circle's funds ten years on in 1957 still only amounted to £11 12s 1d !
                        </p>
                        <p>
                            During its 60 plus years, the WCM has been proud to have as members many notable magicians, both amateur and professional.
                            Len Belcher joined the Circle in February 1948, Tony Shelley, Past International President of the IBM, in 1955, and past
                            member Geoff Ray have also held the highest office in the IBM British Ring.
                        </p>
                        <p>
                            The performing standard of the Members has also been outstanding with many winning national awards for their skill and
                            entertaining performances including many International, IBM, Blackpool and Major Competition winners: Jimmy Carlo, Geoff
                            Ray, Alec Powell, Ron Popple and Sean Carpenter.
                        </p>
                    </p>
                    <h2>Membership</h2>
                    <p>
                        The WCM currently has members originating from all areas across the midlands. Members have a wide ranging interest in magic
                        including Magic Enthusiasts, Collectors, Dealers, professional performers and those who just have a strong fascination and
                        love for the art of Magic.
                    </p>
                    <p>
                        All prospective members of the Wolverhampton Circle of Magicians will be invited to do a presentation of their magic skills.
                        This will be followed by a 6 month associate membership.
                    </p>
                    <p>If you would like further information on joining then please visit our <a className="appLinks" href="/Join">How to Join</a> page.</p>
                    <h2>Events</h2>
                    <p>
                        The WCM endeavours to organise the most interesting possible diary for its members including lectures, social occasions,
                        shows, competitions and other special events. Throughout the year the WCM holds several open events where friends and family
                        of WCM members are welcome to join us. For more information on some of these evening please visit our Events Page.
                    </p>
                </body>
            </div>
        </div>
    );
};

export default About;
