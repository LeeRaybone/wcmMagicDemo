import React from 'react';
import { Button, TextField } from '@mui/material';

import './contact.scss';

const style = {
    '& .MuiOutlinedInput-root': {
        minWidth: '80vw',
        width: '80vw',
        '&.Mui-focused fieldset': {
            borderColor: 'black',
        },
    },
    '& label.Mui-focused': {
        color: 'black',
        margin: 'auto',
    },
    '& .Mui-focused': {
        color: 'black',
        margin: 'auto',
    },
};

const Contact = (): JSX.Element => {
    return (
        <div className="appMainContainer">
            <div className="pageTitleWrapper">
                <h1>How to contact the Wolverhampton Circle of Magicians</h1>
            </div>
            <div className="appMainBodyContainer">
                <div className="bodyText">
                    <p>
                        <b>Meeting Venue: </b>
                        <a
                            className="appLinks"
                            href="https://www.google.co.uk/maps/place/The+ECC+Sports+%26+Social+Club/@52.6051902,-2.1269638,17z/data=!3m1!4b1!4m5!3m4!1s0x0:0x9183d34918503661!8m2!3d52.6051706!4d-2.1269903"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ECC Sports & Social Club, Showell Road, Wolverhampton, WV10 9LU
                        </a>
                    </p>
                    <p>To contact the WCM please use the form or suitable email addresses below:</p>
                    <p>
                        <b>Membership enquiries:</b> David Oakley
                        <br />
                        Email:
                        <a className="appLinks" href="mailTo:datay400@gmail.com" target="_blank" rel="noopener noreferrer">
                            david@davidoakley.co.uk
                        </a>
                    </p>
                    <p>
                        <b>President:</b> Dave Taylor
                        <br />
                        Email:
                        <a className="appLinks" href="mailTo:datay400@gmail.com" target="_blank" rel="noopener noreferrer">
                            datay400@gmail.com
                        </a>
                    </p>
                    <p>
                        <b>Secretary:</b> Sue Oakley
                        <br />
                        Email:{' '}
                        <a className="appLinks" href="mailTo:datay400@gmail.com" target="_blank" rel="noopener noreferrer">
                            secretary@wcm-magic.co.uk
                        </a>
                    </p>
                </div>

                <div className="formContainer">
                    <TextField sx={style} id="outlined-basic" label="Name" variant="outlined" margin="normal" required />
                    <TextField sx={style} id="outlined-basic" label="Email" variant="outlined" margin="normal" required />
                    <TextField sx={style} id="outlined-basic" label="Subject" variant="outlined" margin="normal" required />
                    <TextField sx={style} id="outlined-basic" label="Message" variant="outlined" margin="normal" multiline rows={5} required />

                    <div className="buttonContainer">
                        <Button variant="contained">Send</Button>
                        <Button color="secondary" variant="outlined">
                            Reset
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
