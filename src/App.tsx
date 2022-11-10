import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Drawer, ThemeProvider } from '@mui/material';

import './App.scss';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Events from './pages/events/events';
import HomePage from './pages/homepage/homepage';
import Gallery from './pages/gallery/gallery';
import Join from './pages/join/join';
import Magicians from './pages/magicians/magicians';
import { appTheme } from './theme/theme';

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
            <CssBaseline enableColorScheme />
            <div>
                <Router>
                    <nav aria-label="mailbox folders">
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
                        <Route path="/" element={<HomePage />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/join" element={<Join />} />
                        <Route path="/magicians" element={<Magicians />} />
                        <Route path="/gallery" element={<Gallery />} />
                    </Routes>

                    <Footer />
                </Router>
            </div>
        </ThemeProvider>
    );
};

export default App;
