import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

import '../../members.scss';

import { WcmUser } from '../../../../utils/wcmTypes';
import { updateUserEmailAndName, updateUserPassword } from '../../../../utils/firebase/firebase.utils';

export interface AccountProps {
    currentUser: WcmUser | null;
}

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

const Account = ({ currentUser }: AccountProps): JSX.Element => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(currentUser?.email);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState(currentUser?.name);
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

    const resetFormFields = (newEmail?: string, newDisplayName?: string): void => {
        setEmail(newEmail ?? currentUser?.email);
        setConfirmPassword('');
        setDisplayName(newDisplayName ?? currentUser?.name);
        setNewPassword('');
    };

    const handleUpdate = async (event: any): Promise<void> => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            setIsError(true);
            setErrorMessage('Passwords do not match');
            return;
        }
        let detailsSuccess = null;
        let passwordSuccess = null;

        try {
            if (email && email !== currentUser?.email) {
                detailsSuccess = updateUserEmailAndName(email, displayName);
            }
            if (newPassword && confirmPassword) {
                passwordSuccess = await updateUserPassword(newPassword);
                if (!passwordSuccess) {
                    setIsSuccess(true);
                    setSuccessMessage('Password not changed ensure your password is 6 characters long');
                }
                if (!detailsSuccess && passwordSuccess) {
                    setIsSuccess(true);
                    setSuccessMessage('Password changed successfully');
                }
            }
            if (!detailsSuccess && !passwordSuccess) {
                setIsError(true);
                setErrorMessage('Error updating details');
            }
            setIsSuccess(true);
            setSuccessMessage('User details updated successfully');
            resetFormFields(email, displayName);
        } catch (error: any) {
            if (error.code === 'auth/email-already-in-use') {
                setIsError(true);
                setErrorMessage('Cannot create user, email already in use');
            } else {
                setIsError(true);
                setErrorMessage('User creation encountered an error');
            }
        }
    };

    return (
        <div>
            <div className="appSubBodyContainer">
                <div className="flexRow">
                    <div className="formContainer">
                        <h4>My Account</h4>
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
                        {/* <TextField
                            sx={style}
                            id="outlined-basic"
                            label="Current Password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={currentPassword}
                            onChange={(e) => {
                                setCurrentPassword(e.target.value);
                            }}
                        /> */}
                        <TextField
                            sx={style}
                            id="outlined-basic"
                            label="New Password"
                            variant="outlined"
                            margin="normal"
                            required
                            value={newPassword}
                            onChange={(e) => {
                                setNewPassword(e.target.value);
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
                        <div className="flexRow">
                            <BootstrapButton sx={style} variant="contained" onClick={handleUpdate}>
                                Update
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

export default Account;
