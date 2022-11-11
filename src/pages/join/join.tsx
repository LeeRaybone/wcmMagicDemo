import React from 'react';
import './join.scss';
import { ReactComponent as PDFIcon } from '../../assets/PDFfileIcon.svg'

const Join = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>How to Join the Wolverhampton Circle of Magicians</h1>
            </div>
            <div className="appMainBodyContainer">
                <p>
                    The Wolverhampton Circle of Magicians is always happy to accept new members, both professional and amateur magicians. Magic is
                    based on keeping secrets so we do have a membership process, which will include a presentation of your skills.
                    <br />
                    Please fill in the downloadable form below, then contact the Secretary or Membership Secretary to arrange a meeting.
                    <br />
                    <br />
                    The Membership Secretary will then discuss arrangements for your presentation at the club. This is a chance for you to show that
                    you have basic magic skills, and when successful you will be offered an Associative Membership for 6 months.
                    <br />
                    <br />
                    After a trial period of 6 months, including regular attendance at Circle events, you will be made a full member of the
                    'Wolverhampton Circle of Magicians.'
                    <br />
                    <br />
                    Click on the icon below to download a Wolverhampton Circle of Magicians membership form
                    <br />
                    <br />
                    <a href="http://www.wcm-magic.co.uk/files/WCM-Application-Form.pdf">
                        <PDFIcon height={50} />
                    </a>
                </p>
                <img src={'http://www.wcm-magic.co.uk/images/wcm-group-photo.jpg'} />
            </div>
        </div>
    );
};
export default Join;
