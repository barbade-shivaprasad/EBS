import {useState, useEffect} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import Cookie from 'js-cookie'
import {Link as RouteLink, useHistory} from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
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


const theme = createTheme();

const transport = axios.create({
    withCredentials: true,
})
export default function Login({setisAuthenticated, isAuthenticated, setError, redirect}) {
    const [buttonstate, setButtonState] = useState(false)
    const notify = (msg) => {
        toast.error(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const history = useHistory()
    if (isAuthenticated.status) {
        history.push(`/${redirect}`)
    }

    const [userDetails, setUserDetails] = useState({});
    const handleSubmit = (event) => {
        setButtonState(true)
        console.log("api url", process.env.REACT_APP_API_URL)
        event.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/login`, userDetails).then(res => {
            if (res.data.token != undefined) {
                Cookie.set('token', res.data.token)
                localStorage.setItem('token', res.data.token)
                setisAuthenticated({...isAuthenticated, status: true})
                setError(null)

            }
            else {
                console.log(res.data)
                notify(res.data)
                setButtonState(false)
            }
        }).catch(err => {
            console.log(err)
            setError(err)
            setButtonState(false)
        })
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs" style={{marginBottom: "6rem"}}>
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
                            Sign in
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                value={userDetails.email}
                                onChange={(e) => setUserDetails({...userDetails, email: e.target.value})}
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                value={userDetails.password}
                                label="Password"
                                type="password"
                                onChange={(e) => setUserDetails({...userDetails, password: e.target.value})}
                                id="password"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                disabled={userDetails.password && userDetails.email && buttonstate}
                                className={buttonstate ? "disable-sign-in" : "sign-in"}
                                sx={{mt: 3, mb: 2}}
                                onClick={e => handleSubmit(e)}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <RouteLink to='/resetpassword'>
                                        <Link variant="body2">
                                            Forgot password?
                                        </Link>
                                    </RouteLink>
                                </Grid>
                                <Grid item>
                                    <RouteLink to='/signup'>
                                        <Link variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </RouteLink>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    )
}
