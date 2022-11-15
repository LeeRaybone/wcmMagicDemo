import { useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

import { firebaseStorage } from '../firebase/firebase.utils';

export async function getImage(location: string, imageName: string): Promise<string> {
    const ImageURL = await getDownloadURL(ref(firebaseStorage, location + imageName));
    return ImageURL;
}

export const getAllImages = async (location: string): Promise<void> => {
    const overviewRef = ref(firebaseStorage, `magicians`);

    listAll(overviewRef).then((res) => {
        const promises = res.items.map((imageRef) => getDownloadURL(imageRef));
        Promise.all(promises)
            .then((urls) => {
                console.log('file: image.utils.ts ~ line 20 ~ Promise.all ~ urls', urls);
                return [];
            })
            .catch((err) => {
                console.log(err);
                return [1, 2, 2];
            });
    });

};
