import React, { useEffect, useState } from 'react';

import './magician.scss';

import { WcmMagician } from '../../../utils/wcmTypes';
import { getImage } from '../../../utils/wcmUtils/image.utils';

export interface MagicianProps {
    magician: WcmMagician;
}

const Magician = ({ magician }: MagicianProps): JSX.Element => {
    const [image, setImage] = useState('');

    useEffect(() => {
        const fetchImage = async (): Promise<void> => {
            if (magician.imageFilename) {
                const tempImage = await getImage('magicians/', magician.imageFilename);
                setImage(tempImage);
            }
        };

        fetchImage().catch(console.error);
    }, []);

    return (
        <div key={magician.name} className="eventItemImageBody">
            {magician.imageFilename && image && <img src={image} className="magiciansItemImg" alt="eventImage" />}
            <h3>{magician.name}</h3>
            {magician.website1 && (
                <div className="eventItemDescWrapper">
                    <span className="eventItemDescText">
                        <a className="appLinks" href={magician.website1}>
                            {magician.website1?.replace('http://', '').replace('https://', '')}
                        </a>
                    </span>
                </div>
            )}
            {magician.website2 && (
                <div className="eventItemDescWrapper">
                    <span className="eventItemDescText">
                        <a className="appLinks" href={magician.website2}>
                            {magician.website2.replace('http://', '').replace('https://', '')}
                        </a>
                    </span>
                </div>
            )}
        </div>
    );
};

export default Magician;
