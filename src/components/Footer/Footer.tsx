import React from 'react';
import { DateTime } from 'luxon';

import './Footer.scss';

const Footer = (): JSX.Element => {
    return (
        <div className="footer">
            <div className="copyrightText">
                <span className="footer-text">Copyright ©{DateTime.now().year} Wolverhampton Circle of Magicians. All Rights Reserved</span>
            </div>
        </div>
    );
};

export default Footer;
