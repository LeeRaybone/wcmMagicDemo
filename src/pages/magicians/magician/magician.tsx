import React, { useEffect, useState } from 'react';

import './magician.scss';

import { getImage } from '../../../utils/wcmUtils/image.utils';

export interface MagicianProps {
    magician: any;
}

const Magician = ({ magician }: MagicianProps): JSX.Element => {
    const [image, setImage] = useState('');

    useEffect(() => {
        (async () => {
            const tempImage = await getImage('magicians/', magician.imageUrl);
            setImage(tempImage);
        })();
    }, []);

    return (
        <div key={magician.name} className="eventItemImageBody">
            {magician.imageUrl && image && <img src={image} className="magiciansItemImg" alt="eventImage" />}
            <h3>{magician.name}</h3>
            <div className="eventItemDescWrapper">
                <span className="eventItemDescText">
                    <a className="appLinks" href={magician.website1}>
                        {magician.website1.replace('http://', '').replace('https://', '')}
                    </a>
                </span>
            </div>{' '}
            {magician.website2 && (
                <div className="eventItemDescWrapper">
                    <span className="eventItemDescText">
                        {' '}
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
