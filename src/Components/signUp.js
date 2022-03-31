import {useState, useEffect} from 'react';
import {Link as RouterLink, Redirect} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import axios from 'axios'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Verify from './verify'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const REACT_APP_API_URL = process.env.REACT_APP_API_URL

const theme = createTheme();

const transport = axios.create({
    withCredentials: true,
})
export default function SignUp({setisAuthenticated, isAuthenticated, error, setError, setSuccess, notifySuccess}) {
    const [userSignUp, setUserSignUp] = useState({})
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [sentMail, setSentMail] = useState(false);
    const [buttonState, setButtonState] = useState(false);
    useEffect(() => {
        setisAuthenticated({...isAuthenticated, status: false})
    }, [])
    const isDisable = () => {
        if (buttonState) {
            return true
        }
        else if (!(userSignUp.name && userSignUp.email && userSignUp.password && confirmPassword)) {
            return true
        }
        return false
    }

    const handleSubmit = (event) => {
        console.log(confirmPassword, userSignUp)
        setButtonState(true)
        console.log(process.env.REACT_APP_URL)
        event.preventDefault();
        console.log(userSignUp)
        if (confirmPassword == userSignUp.password) {
            transport.post(`${REACT_APP_API_URL}/sendmail`, {email: userSignUp.email, shouldExist: false}).then(res => {
                if (res.status != 200) {
                    throw new Error(res.data)
                } else {
                    setSentMail(true)
                    toast.success(`otp successfully sent to ${userSignUp.email}`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    console.log(res.data)
                    setButtonState(false)
                }
            }).catch(err => {
                toast.error(`${err.message}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setButtonState(false)
                console.log(err)
            })
        }
        else {
            console.log('password mismatch')
            toast.error("Password mismatch", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setButtonState(false)
        }
    };
    if (isAuthenticated.status) return <Redirect to='/' />
    else if (sentMail) {

        return <Verify notifySuccess={notifySuccess} isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} userSignUp={userSignUp} error={error} setError={setError} setSuccess={setSuccess} />
    }
    return (
        <>
        <ToastContainer/>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" style={{marginBottom: "8rem"}}>
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        placeholder="Enter your name"
                                        onChange={(e) => setUserSignUp({...userSignUp, name: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        value={userSignUp.email}
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => setUserSignUp({...userSignUp, email: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        value={userSignUp.password}
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onChange={(e) => setUserSignUp({...userSignUp, password: e.target.value})}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        type="password"
                                        value={confirmPassword}
                                        id="confirm password"
                                        label="Confirm password"
                                        name="confirm password"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                className={!isDisable() ? 'sign-in' : 'disable-sign-in'}
                                disabled={isDisable()}
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Sign up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <RouterLink to='/login'>
                                        <Link variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </RouterLink >
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
