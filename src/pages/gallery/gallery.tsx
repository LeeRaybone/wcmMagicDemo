import React, { useState } from 'react';
import Carousel from 'react-gallery-carousel';

import 'react-gallery-carousel/dist/index.css';
import './gallery.scss';

const Gallery = (): JSX.Element => {
    const [show, setShow] = useState(false);

    const images = [
        {
            src: 'http://www.wcm-magic.co.uk/gallery/012.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/036.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/060.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/100_0717.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/115.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/117.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/173.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/180.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/195.jpg',
        },
        {
            src: 'http://www.wcm-magic.co.uk/gallery/195.jpg',
        },
    ];

    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>WCM Gallery</h1>
            </div>
            <div className="appMainBodyContainer">
                <Carousel
                    images={images}
                    isLoop
                    hasIndexBoard="topRight"
                    hasMediaButton={false}
                    hasMediaButtonAtMax="bottomLeft"
                    hasSizeButton="bottomRight"
                    hasDotButtons="bottom"
                    style={{ marginLeft: '5%', marginRight: '5%', height: '900px', width: '90%' }}
                />
            </div>
        </div>
    );
};

export default Gallery;
