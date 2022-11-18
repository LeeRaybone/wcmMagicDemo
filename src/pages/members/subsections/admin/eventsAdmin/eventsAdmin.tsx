import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, List, ListItemText, MenuItem, styled, TextField } from '@mui/material';
import { DateTime } from 'luxon';

import { createNewDocument, deleteDocument, getAllEvents, updateEvent } from '../../../../../utils/firebase/firebase.utils';
import { WcmEvent } from '../../../../../utils/wcmTypes';

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

const EventsAdmin = (): JSX.Element => {
    const [eventsArray, setEventsArray] = useState<WcmEvent[]>([]);
    const dateNow = DateTime.now(); /// DateTime.fromFormat("03/04/2023", 'dd/MM/yyyy');
    const currYear = dateNow.year;
    const prevYear = dateNow.year - 1;
    const nextYear = dateNow.year + 1;
    const [startYear] = useState(dateNow.month > 6 && dateNow.month <= 12 ? currYear.toString() : prevYear.toString());
    const [endYear] = useState(dateNow.month > 6 && dateNow.month <= 12 ? nextYear.toString() : currYear.toString());
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [selectedEvent, setSelectedEvent] = useState<WcmEvent | null>(null);

    const navigate = useNavigate();
    // lecture?: boolean;
    // openNight?: boolean;
    // visitors?: boolean;
    const [title, setTitle] = useState('');
    const [theme, setTheme] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const [linkText, setLinkText] = useState('');
    const [linkUrl, setLinkUrl] = useState('');
    const [imageFilename, setImageFilename] = useState('');
    const [imageAsFile, setImageAsFile] = useState('');

    const [lecture, setLecture] = useState(false);
    const [openNight, setOpenNight] = useState(false);
    const [visitors, setVisitors] = useState(false);

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
        const fetchEventData = async (): Promise<void> => {
            const data = await getAllEvents();
            const filteredData = data
                .filter(
                    (d) =>
                        d.date >= DateTime.fromFormat(`30/06/${startYear}`, 'dd/MM/yyyy') &&
                        d.date <= DateTime.fromFormat(`01/08/${endYear}`, 'dd/MM/yyyy')
                )
                .sort((a: WcmEvent, b: WcmEvent): number => (a.date > b.date ? 1 : -1));
            setEventsArray(filteredData);
        };
        // call the function
        fetchEventData()
            // make sure to catch any error
            .catch(console.error);
    }, [isSuccess, isError]);

    useEffect(() => {
        if (selectedIndex !== null) {
            setSelectedEvent(eventsArray[selectedIndex]);
            setTitle(eventsArray[selectedIndex].title);
            setTheme(eventsArray[selectedIndex].theme ?? '');
            setDescription(eventsArray[selectedIndex].description ?? '');
            setDate(eventsArray[selectedIndex].date.toFormat('dd/MM/yyyy') ?? '');
            setLinkText(eventsArray[selectedIndex].linkText ?? '');
            setLinkUrl(eventsArray[selectedIndex].linkUrl ?? '');
            setImageFilename(eventsArray[selectedIndex].imageFilename ?? '');
            setLecture(eventsArray[selectedIndex].lecture ?? false);
            setOpenNight(eventsArray[selectedIndex].openNight ?? false);
            setVisitors(eventsArray[selectedIndex].visitors ?? false);
            setIsError(false);
            setIsSuccess(false);
            console.log('file: eventsAdmin.tsx ~ line 181 ~ handleUpdate ~  typeof (tempEvent)', typeof eventsArray[selectedIndex]);
        }
    }, [selectedIndex]);

    const resetFormFields = (): void => {
        setTitle('');
        setTheme('');
        setDescription('');
        setDate('');
        setLinkText('');
        setLinkUrl('');
        setImageFilename('');
        setLecture(false);
        setOpenNight(false);
        setVisitors(false);
        setSelectedEvent(null);
        setSelectedIndex(null);
        setIsError(false);
        setIsSuccess(false);
    };

    const handleUpdate = (): void => {
        if (selectedIndex !== null) {
            const tempEvent: WcmEvent = {
                id: eventsArray[selectedIndex].id,
                date: DateTime.fromFormat(date, 'dd/MM/yyyy'),
                description: description,
                imageFilename: imageFilename,
                lecture: lecture,
                linkText: linkText,
                linkUrl: linkUrl,
                openNight: openNight,
                theme: theme,
                title: title,
                visitors: visitors,
            };

            const successResponse = updateEvent(tempEvent, imageAsFile);
            if (!successResponse) {
                setIsError(true);
                setErrorMessage('Update event encountered an error');
            } else {
                setIsSuccess(true);
                setSuccessMessage('Event details updated successfully');
                resetFormFields();
            }
        }
    };

    const handleDelete = (): void => {
        if (selectedIndex !== null) {
            const documentId = eventsArray[selectedIndex].id;
            if (documentId) {
                const successResponse = deleteDocument('events', documentId);
                if (!successResponse) {
                    setIsError(true);
                    setErrorMessage('Delete event encountered an error');
                } else {
                    setIsSuccess(true);
                    setSuccessMessage('Event details deleted successfully');
                    resetFormFields();
                }
            }
        }
    };

    const handleAdd = (): void => {
        const tempEvent: WcmEvent = {
            date: DateTime.fromFormat(date, 'dd/MM/yyyy'),
            description: description,
            imageFilename: imageFilename,
            lecture: lecture,
            linkText: linkText,
            linkUrl: linkUrl,
            openNight: openNight,
            theme: theme,
            title: title,
            visitors: visitors,
        };

        const successResponse = createNewDocument('events', tempEvent, undefined, imageAsFile);
        if (!successResponse) {
            setIsError(true);
            setErrorMessage('Add event encountered an error');
        } else {
            setIsSuccess(true);
            setSuccessMessage('Added event details successfully');
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
                <h4>
                    Season: {startYear} - {endYear}
                </h4>
                <div className="flexRow">
                    <div className="formContainer">
                        <h4>Events List</h4>
                        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
                            {eventsArray.map((e, index) => {
                                return (
                                    <MenuItem key={index} onClick={() => setSelectedIndex(index)} selected={selectedIndex === index}>
                                        <ListItemText primary={e.date.toFormat('dd/MM/yyyy').toString()} secondary={e.title} />
                                    </MenuItem>
                                );
                            })}
                        </List>
                    </div>
                    <div className="formContainer">
                        <h4>{selectedIndex ? 'Edit' : 'Add'} Event</h4>
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Date - dd/mm/yyyy"
                            variant="outlined"
                            margin="normal"
                            required
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            margin="normal"
                            required
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Theme"
                            variant="outlined"
                            margin="normal"
                            value={theme}
                            onChange={(e) => {
                                setTheme(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Description"
                            variant="outlined"
                            margin="normal"
                            value={description}
                            multiline
                            rows={5}
                            onChange={(e) => {
                                setDescription(e.target.value);
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
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Link Text"
                            variant="outlined"
                            margin="normal"
                            value={linkText}
                            onChange={(e) => {
                                setLinkText(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Link URL"
                            variant="outlined"
                            margin="normal"
                            value={linkUrl}
                            onChange={(e) => {
                                setLinkUrl(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={style} />}
                            label="Lecture"
                            checked={lecture === true ? true : false}
                            onClick={() => {
                                setLecture(!lecture);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={style} />}
                            label="Visitors Allowed"
                            checked={visitors === true ? true : false}
                            onChange={() => {
                                setVisitors(!visitors);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={style} />}
                            label="Open night"
                            checked={openNight === true ? true : false}
                            onChange={() => {
                                setOpenNight(!openNight);
                            }}
                        />

                        <div className="flexRow">
                            {selectedEvent && (
                                <BootstrapButton sx={style} variant="contained" onClick={handleUpdate}>
                                    Update
                                </BootstrapButton>
                            )}
                            {selectedEvent && (
                                <BootstrapButton sx={style} color="warning" variant="contained" onClick={handleDelete}>
                                    Delete
                                </BootstrapButton>
                            )}
                            {!selectedEvent && (
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

export default EventsAdmin;
