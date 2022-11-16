import React, { useContext, useEffect, useState } from 'react';
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
import { getUserInfo, signOut } from '../../utils/firebase/firebase.utils';
import { WcmUser } from '../../App';

const Menu = (): JSX.Element => {
    const user = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState<WcmUser | null>(null);
    
    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
            if (user) {
                const data = await getUserInfo(user?.uid);
                setCurrentUser(data);
            }
        };
        // call the function
        fetchUserData()
            // make sure to catch any error
            .catch(console.error);
    }, [user]);
    
    return (
        <div>
            <div className="menuHeader">
                <img src={wcmLogo} className="menulogo" alt="logo" />
                {currentUser && (
                    <span className="userText">
                        Welcome
                        <br />
                        {currentUser.name}
                    </span>
                )}
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
                    <ListItemButton href="/about">
                        <ListItemIcon>
                            <AboutIcon />
                        </ListItemIcon>
                        <ListItemText primary="About" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/events">
                        <ListItemIcon>
                            <EventsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Events" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/join">
                        <ListItemIcon>
                            <JoinIcon />
                        </ListItemIcon>
                        <ListItemText primary="Joining" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/magicians">
                        <ListItemIcon>
                            <MagiciansIcon />
                        </ListItemIcon>
                        <ListItemText primary="Magicians" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/gallery">
                        <ListItemIcon>
                            <GalleryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Gallery" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href="/contact">
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
