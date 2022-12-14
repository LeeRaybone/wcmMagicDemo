import React from 'react';

import './Header.scss';

import { ReactComponent as HamburgerIcon } from '../../assets/hamburger.svg';
import wcmLogo from '../../assets/logoWCM.svg';

export interface HeaderProps {
    openMenu: () => void;
}

const Header = ({ openMenu }: HeaderProps): JSX.Element => {
    const handleMenu = (): void => {
        openMenu();
    };

    return (
        <header className="header">
            <a href="/">
                <img src={wcmLogo} className="App-logo" alt="logo" />
            </a>
            <span className="header-text">Wolverhampton Circle of Magicians</span>
            <div className="menuWrapper">
                <HamburgerIcon id="menu" className="menuIcon" onClick={handleMenu} />
            </div>
        </header>
    );
};

export default Header;
