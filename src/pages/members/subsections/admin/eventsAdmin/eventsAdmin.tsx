import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, List, ListItemText, MenuItem, styled, TextField } from '@mui/material';
import { DateTime } from 'luxon';

import { getAllEvents } from '../../../../../utils/firebase/firebase.utils';
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
    const [startYear] = useState(2022);
    const [endYear] = useState(2023);
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
    }, []);

    useEffect(() => {
        if (selectedIndex !== null) {
            setSelectedEvent(eventsArray[selectedIndex]);
            console.log('file: eventsAdmin.tsx ~ line 92 ~ useEffect ~ eventsArray[selectedIndex]', eventsArray[selectedIndex]);
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
    };

    return (
        <div>
            <div className="appSubBodyContainer">
                <div className="flexRow">
                    <div className="formContainer">
                        <h4>Events List</h4>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            {eventsArray.map((e, index) => {
                                return (
                                    <MenuItem onClick={() => setSelectedIndex(index)} selected={selectedIndex === index}>
                                        <ListItemText primary={e.date.toFormat('dd/MM/yyyy').toString()} secondary={e.title} />
                                    </MenuItem>
                                );
                            })}
                        </List>
                    </div>
                    <div className="formContainer">
                        <h4>Edit/Add Event</h4>
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
                            <BootstrapButton sx={style} variant="contained" onClick={() => {}}>
                                Update
                            </BootstrapButton>
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
