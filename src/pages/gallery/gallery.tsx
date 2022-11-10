import React from 'react';

import './gallery.scss';



const Gallery = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>WCM Gallery</h1>
            </div>
            <body className="eventsInfoBody">
                <p>
                    If you are looking for Magical Entertainment for your special event, then please contact us so we can put you in touch with
                    mystifying magicians from your local area.
                    <br />
                    Alternatively you can click on the links below to visit the websites of our professional entertainers.
                </p>
            </body>
        </div>
    );
};

export default Gallery;
