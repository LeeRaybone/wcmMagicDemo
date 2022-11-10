import React from 'react';
import { DateTime } from 'luxon';

import './Footer.scss';

const Footer = (): JSX.Element => {
    return (
        <div className="footer">
            <div className="copyrightText">
                <text className="footer-text">Copyright ©{DateTime.now().year} Wolverhampton Circle of Magicians. All Rights Reserved</text>
            </div>
        </div>
    );
};

export default Footer;
