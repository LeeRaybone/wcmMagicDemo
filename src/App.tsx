import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Drawer, ThemeProvider } from '@mui/material';

import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import { AuthProvider } from './contexts/auth.context';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Events from './pages/events/events';
import Gallery from './pages/gallery/gallery';
import HomePage from './pages/homepage/homepage';
import Join from './pages/join/join';
import Magicians from './pages/magicians/magicians';
import Members from './pages/members/members';
import SignIn from './pages/signIn/signIn';
import { appTheme } from './theme/theme';

export type WcmUser = {
    email: string;
};

const App = (): JSX.Element => {
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        setIsOpen(false);
    }, []);

    const toggleDrawer = (): void => {
        console.log('file: App.tsx ~ line 19 ~ toggleDrawer ~ isOpen', isOpen);
        setIsOpen((prev) => !prev);
    };

    return (
        <ThemeProvider theme={appTheme}>
            <AuthProvider>
                <CssBaseline enableColorScheme />
                <div>
                    <Router basename={window.location.pathname || ''}>
                        <nav aria-label="menu">
                            <Drawer
                                open={isOpen}
                                onClose={toggleDrawer}
                                anchor="right"
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                            >
                                <Menu />
                            </Drawer>
                        </nav>
                        <Header openMenu={toggleDrawer} />
                        <Routes>
                            <Route index path="/" element={<HomePage />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/events" element={<Events />} />
                            <Route path="/join" element={<Join />} />
                            <Route path="/magicians" element={<Magicians />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/members" element={<Members />} />
                        </Routes>

                        <Footer />
                    </Router>
                </div>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
