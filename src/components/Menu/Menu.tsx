import React from 'react';
import EventsIcon from '@mui/icons-material/Event';
import JoinIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import GalleryIcon from '@mui/icons-material/Image';
import AboutIcon from '@mui/icons-material/InfoRounded';
import MailIcon from '@mui/icons-material/Mail';
import MagiciansIcon from '@mui/icons-material/Search';
import MembersIcon from '@mui/icons-material/VerifiedUser';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import './Menu.scss';

import wcmLogo from '../../assets/logoWCMwhite.svg';

export interface MenuProps {}

const Menu = ({}: MenuProps): JSX.Element => {
    return (
        <div className="menuContainer">
            <div className="menuHeader">
                <img src={wcmLogo} className="menulogo" alt="logo" />
            </div>
            <List>
                <ListItem disablePadding>
                    <ListItemButton href="/">
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/About">
                        <ListItemIcon>
                            <AboutIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/Events">
                        <ListItemIcon>
                            <EventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/Join">
                        <ListItemIcon>
                            <JoinIcon />
                        </ListItemIcon>
                        <ListItemText primary="Joining" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/Magicians">
                        <ListItemIcon>
                            <MagiciansIcon />
                        </ListItemIcon>
                        <ListItemText primary="Magicians" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/Gallery">
                        <ListItemIcon>
                            <GalleryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gallery" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/Contact">
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary="Contact" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/MembersLogin">
                        <ListItemIcon>
                            <MembersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Members Area" />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};
export default Menu;
