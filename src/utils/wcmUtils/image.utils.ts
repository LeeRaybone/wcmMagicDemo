import { getDownloadURL, listAll, ref } from 'firebase/storage';

import { firebaseStorage } from '../firebase/firebase.utils';

export async function getImage(location: string, imageName: string): Promise<string> {
    const ImageURL = await getDownloadURL(ref(firebaseStorage, location + imageName));
    return ImageURL;
}

export const getAllImages = async (location: string): Promise<any[]> => {
    const overviewRef = ref(firebaseStorage, location);

    return new Promise<any[]>((resolve) => {
        listAll(overviewRef).then((res) => {
            const promises = res.items.map((imageRef) => getDownloadURL(imageRef));
            Promise.all(promises)
                .then((urls) => {
                    resolve(urls);
                })
                .catch((err) => {
                    console.log(err);
                    return null;
                });
        });
    });
};
