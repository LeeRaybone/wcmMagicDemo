import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, List, ListItemText, MenuItem, styled, TextField } from '@mui/material';

import { createNewDocument, deleteDocument, getAllMagicians, updateMagician } from '../../../../../utils/firebase/firebase.utils';
import { WcmMagician } from '../../../../../utils/wcmTypes';

const style = {
    '& .MuiOutlinedInput-root': {
        minWidth: '35vw',
        width: '35vw',
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
    '& .MuiFormControl-root': {
        marginTop: '16px',
    },
    '& label.Mui-focused': {
        color: 'black',
        margin: 'auto',
    },
    '& .Mui-focused': {
        color: 'black',
        margin: 'auto',
    },
    '& .MuiSvgIcon-root': { fontSize: 28 },
    '& .MuiAutocomplete-root': {
        minWidth: '35vw',
        width: '35vw',
    },
};

const BootstrapButton = styled(Button)({
    margin: '1rem',
    width: '8rem',
    height: '2.5rem',
});

const MagiciansAdmin = (): JSX.Element => {
    const [magicianArray, setMagiciansArray] = useState<WcmMagician[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedMagician, setSelectedMagician] = useState<WcmMagician | null>(null);

    const navigate = useNavigate();
    // lecture?: boolean;
    // openNight?: boolean;
    // visitors?: boolean;
    const [name, setName] = useState('');
    const [website1, setWebsite1] = useState('');
    const [website2, setWebsite2] = useState('');
    const [imageFilename, setImageFilename] = useState('');
    const [imageAsFile, setImageAsFile] = useState('');

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token');

        if (authToken) {
            navigate('/members');
        }

        if (!authToken) {
            navigate('/home');
        }
    }, []);

    useEffect(() => {
        const fetchMagicianData = async (): Promise<void> => {
            const data = await getAllMagicians();
            setMagiciansArray(data.sort((a: WcmMagician, b: WcmMagician) => a.name.localeCompare(b.name)));
        };
        // call the function
        fetchMagicianData()
            // make sure to catch any error
            .catch(console.error);
    }, [isSuccess, isError]);

    useEffect(() => {
        if (selectedIndex !== null) {
            setSelectedMagician(magicianArray[selectedIndex]);
            setName(magicianArray[selectedIndex].name);
            setWebsite1(magicianArray[selectedIndex].website1 ?? '');
            setWebsite2(magicianArray[selectedIndex].website2 ?? '');
            setImageFilename(magicianArray[selectedIndex].imageFilename ?? '');
            setIsError(false);
            setIsSuccess(false);
        }
    }, [selectedIndex]);

    const resetFormFields = (): void => {
        setName('');
        setWebsite1('');
        setWebsite2('');
        setImageFilename('');
        setSelectedMagician(null);
        setSelectedIndex(null);
        setIsError(false);
        setIsSuccess(false);
    };

    const handleUpdate = (): void => {
        if (selectedIndex !== null) {
            const tempMagician: WcmMagician = {
                id: magicianArray[selectedIndex].id,
                name: name,
                website1: website1,
                website2: website1,
                imageFilename: imageFilename,
            };
            const successResponse = updateMagician(tempMagician, imageAsFile);
            if (!successResponse) {
                setIsError(true);
                setErrorMessage('Update Magician encountered an error');
            } else {
                setIsSuccess(true);
                setSuccessMessage('Magician details updated successfully');
                resetFormFields();
            }
        }
    };

    const handleDelete = (): void => {
        if (selectedIndex !== null) {
            const documentId = magicianArray[selectedIndex].id;
            if (documentId) {
                const successResponse = deleteDocument('magicians', documentId);
                if (!successResponse) {
                    setIsError(true);
                    setErrorMessage('Delete magician encountered an error');
                } else {
                    setIsSuccess(true);
                    setSuccessMessage('Magician details deleted successfully');
                    resetFormFields();
                }
            }
        }
    };

    const handleAdd = (): void => {
        const tempMagician: WcmMagician = {
            name: name,
            website1: website1,
            website2: website1,
            imageFilename: imageFilename,
        };

        const successResponse = createNewDocument('magicians', undefined, tempMagician, imageAsFile);
        if (!successResponse) {
            setIsError(true);
            setErrorMessage('Add magician encountered an error');
        } else {
            setIsSuccess(true);
            setSuccessMessage('Added magician details successfully');
            resetFormFields();
        }
    };

    const handleImageAsFile = (e: any): void => {
        const image = e.target.files[0];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setImageAsFile((imageFile) => image);
        setImageFilename(image.name);
    };

    return (
        <div>
            <div className="appSubBodyContainer">
                <div className="flexRow">
                    <div className="formContainer">
                        <h4>Magician's List</h4>
                        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                            {magicianArray.map((e, index) => {
                                return (
                                    <MenuItem key={index} onClick={() => setSelectedIndex(index)} selected={selectedIndex === index}>
                                        <ListItemText primary={e.name} />
                                    </MenuItem>
                                );
                            })}
                        </List>
                    </div>
                    <div className="formContainer">
                        <h4>{selectedIndex ? 'Edit' : 'Add'} Magician</h4>
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Website 1"
                            variant="outlined"
                            margin="normal"
                            required
                            value={website1}
                            onChange={(e) => {
                                setWebsite1(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Website 2"
                            variant="outlined"
                            margin="normal"
                            value={website2}
                            onChange={(e) => {
                                setWebsite2(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Image Filename"
                            variant="outlined"
                            margin="normal"
                            value={imageFilename}
                            onChange={(e) => {
                                setImageFilename(e.target.value);
                            }}
                        />
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={handleImageAsFile} />
                        </Button>
                        <div className="flexRow">
                            {selectedMagician && (
                                <BootstrapButton sx={style} variant="contained" onClick={handleUpdate}>
                                    Update
                                </BootstrapButton>
                            )}
                             {selectedMagician && (
                                <BootstrapButton sx={style} color="warning" variant="contained" onClick={handleDelete}>
                                    Delete
                                </BootstrapButton>
                            )}
                            {!selectedMagician && (
                                <BootstrapButton sx={style} variant="contained" onClick={handleAdd}>
                                    Add
                                </BootstrapButton>
                            )}
                            <BootstrapButton sx={style} color="secondary" variant="outlined" onClick={resetFormFields}>
                                Reset
                            </BootstrapButton>
                        </div>
                        {isError && <span className="errorMessage">{errorMessage}</span>}
                        {isSuccess && <span className="successMessage">{successMessage}</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MagiciansAdmin;
