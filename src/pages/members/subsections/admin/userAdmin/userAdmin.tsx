import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Checkbox, FormControlLabel, styled, TextField } from '@mui/material';
import { DateTime } from 'luxon';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../../../../utils/firebase/firebase.utils';

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

const UserAdmin = (): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [dateJoined, setDateJoined] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isFullMember, setIsFullMember] = useState(false);
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

    const resetFormFields = (): void => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setDisplayName('');
        setDateJoined('');
        setIsAdmin(false);
        setIsFullMember(false);
    };

    const handleCreate = async (event: any): Promise<void> => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords do not match');
            return;
        }

        try {
            const userCreds = await createAuthUserWithEmailAndPassword(email, password);
            if (userCreds) {
                await createUserDocumentFromAuth(userCreds.user, {
                    displayName,
                    dateJoined,
                    dateCreated: DateTime.now().toFormat('dd/MM/yyyy'),
                    fullMember: isFullMember,
                    admin: isAdmin,
                });
                resetFormFields();
                setIsSuccess(true);
                setSuccessMessage('User created successfully');
            }
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setIsError(true);
                setErrorMessage('Cannot create user, email already in use');
            } else {
                setIsError(true);
                setErrorMessage('user creation encountered an error');
            }
        }
    };

    return (
        <div>
            <div className="appSubBodyContainer">
                <div className="flexRow">
                    <div className="formContainer">
                        <h4>Create New User</h4>
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            margin="normal"
                            required
                            value={displayName}
                            onChange={(e) => {
                                setDisplayName(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Confirm Password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                            }}
                        />
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Date Joined - dd/mm/yyyy"
                            variant="outlined"
                            margin="normal"
                            required
                            value={dateJoined}
                            onChange={(e) => {
                                setDateJoined(e.target.value);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={style} />}
                            label="Full Member"
                            checked={isFullMember === true ? true : false}
                            onClick={() => {
                                setIsFullMember(!isFullMember);
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox sx={style} />}
                            label="Admin User"
                            checked={isAdmin === true ? true : false}
                            onChange={() => {
                                setIsAdmin(!isAdmin);
                            }}
                        />
                        <div className="flexRow">
                            <BootstrapButton sx={style} variant="contained" onClick={handleCreate}>
                                Create
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

export default UserAdmin;
