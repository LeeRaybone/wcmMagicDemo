import React from 'react';
import { DateTime } from 'luxon';

import './Footer.css';

function Header() {
    return (
        <div className="footer">
            <text className="footer-text">Copyright ©{DateTime.now().year} Wolverhampton Circle of Magicians. All Rights Reserved</text>
        </div>
    );
}

export default Header;
