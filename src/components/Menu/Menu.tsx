import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import EventsIcon from '@mui/icons-material/Event';
import JoinIcon from '@mui/icons-material/Group';
import HomeIcon from '@mui/icons-material/Home';
import GalleryIcon from '@mui/icons-material/Image';
import AboutIcon from '@mui/icons-material/InfoRounded';
import LogOutIcon from '@mui/icons-material/Logout';
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
import { AuthContext } from '../../contexts/auth.context';
import { signOut } from '../../utils/firebase/firebase.utils';

const Menu = (): JSX.Element => {
    const user = useContext(AuthContext);

    console.log('file: Menu.tsx ~ line 25 ~ Menu ~ currentUser', user);
    return (
        <div>
            <div className="menuHeader">
                <img src={wcmLogo} className="menulogo" alt="logo" />
                {user && (
                    <span className="userText">
                        Welcome
                        <br />
                        {user.displayName}
                    </span>
                )}
            </div>
            <List>
                <ListItem disablePadding>
                    <Link to="/">
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to="/about">
                        <ListItemButton>
                            <ListItemIcon>
                                <AboutIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </Link>
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
                    <ListItemButton href="/signin">
                        <ListItemIcon>
                            <MembersIcon />
                        </ListItemIcon>
                        <ListItemText primary="Members Area" />
                    </ListItemButton>
                </ListItem>
                {user && (
                    <ListItem disablePadding>
                        <ListItemButton href="/" onClick={() => signOut()}>
                            <ListItemIcon>
                                <LogOutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Log Out" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </div>
    );
};
export default Menu;
