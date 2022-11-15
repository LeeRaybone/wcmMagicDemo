import React, { useEffect, useState } from 'react';
import Carousel from 'react-gallery-carousel';

import 'react-gallery-carousel/dist/index.css';
import './gallery.scss';

import { getAllImages } from '../../utils/wcmUtils/image.utils';
export type GalleryImage = {
    src?: string;
};
const Gallery = (): JSX.Element => {
    const [images, setImages] = useState<any[]>([]);

    useEffect(() => {
        const fetchImage = async (): Promise<void> => {
            const imageUrls = await getAllImages('gallery/');
            const tempImages: GalleryImage[] = [];

            imageUrls.map((i) => {
                const tempImage: GalleryImage = {
                    src: i,
                };
                tempImages.push(tempImage);
            });
            setImages(tempImages);
        };

        fetchImage().catch(console.error);
    }, []);

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
