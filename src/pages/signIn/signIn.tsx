import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { UserCredential } from 'firebase/auth';

import './signIn.scss';

import { signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

const style = {
    '& .MuiOutlinedInput-root': {
        minWidth: '200px',
        width: '50vw',
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

const SignIn = (): JSX.Element => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isPasswordError, setIsPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = sessionStorage.getItem('Auth Token');

        if (authToken) {
            navigate('/members');
        }

        if (!authToken) {
            navigate('/signin');
        }
    }, []);
    const handleSignIn = async (event: any): Promise<void> => {
        event.preventDefault();
        try {
            const response: UserCredential | null = await signInAuthUserWithEmailAndPassword(email, password);
            console.log('file: signIn.tsx ~ line 41 ~ handleSignIn ~ response', response);

            if (response) {
                navigate('/members');
                sessionStorage.setItem('Auth Token', response?.user.refreshToken);
            }
        } catch (error: any) {
            switch (error.code) {
                case 'auth/wrong-password':
                    setIsError(true);
                    setIsPasswordError(true);
                    setErrorMessage('invaild credentials');
                    break;
                case 'auth/user-not-found':
                    setIsError(true);
                    setErrorMessage('user does not exist');
                    break;
                case 'auth/invalid-email':
                    setIsError(true);
                    setIsEmailError(true);
                    setErrorMessage('Please enter a vaild email address');
                    break;
                default:
                    setIsError(true);
                    setErrorMessage('Unknown error please contact ...');
                    console.log('file: signIn.tsx ~ line 41 ~ handleSignIn ~ error.code', error.code);
                    break;
            }
        }
    };

    return (
        <div className="appMainContainer">
            <h1>To access the members area, you need to Sign In</h1>
            <div className="appMainBodyContainer">
                <div className="formContainer">
                    <TextField
                        sx={style}
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        required
                        error={isEmailError}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />
                    <TextField
                        sx={style}
                        id="outlined-basic"
                        type="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        required
                        error={isPasswordError}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />

                    <div className="singleButtonContainer">
                        <Button variant="contained" onClick={handleSignIn}>
                            Sign In
                        </Button>
                    </div>
                    {isError && <span className="errorMessage">{errorMessage}</span>}
                </div>
            </div>
        </div>
    );
};

export default SignIn;
