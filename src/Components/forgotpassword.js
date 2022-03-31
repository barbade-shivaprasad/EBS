import {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import {useState} from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import axios from 'axios'
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';


const theme = createTheme();

const transport = axios.create({
    withCredentials: true,
})
export default function ForgotPassword({setError, setSuccess, isAuthenticated, setisAuthenticated, notifySuccesss}) {
    const [userDetails, setUserDetails] = useState({});
    const [otp, setOtp] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [redirect, setRedirect] = useState(false);
    const [buttons, setButtons] = useState({sendButton: true, verifyButton: true, submitButton: true});
    const [verify, setVerify] = useState(false);
    const settingStyle = (button) => {
        if (button) {
            return "disable-sign-in"
        }
        return "sign-in"
    }
    const resetButton = () => {
        if (verify) {
            if (userDetails.password && confirmpassword) {
                return false
            }
        }
        return true;
    }


    const sendotp = (e) => {
        console.log(userDetails)
        setButtons({...buttons, sendButton: true})
        e.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/sendmail`, {email: userDetails.email, shouldExist: true}).then((res) => {
            if (res.status != 200) {
                throw new Error(res.data);
            }

            toast.success(`sent mail`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setButtons({...buttons, verifyButton: false})
            setOtp("")
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
            setButtons({...buttons, sendButton: false})
            console.log(err)
        })
    }
    const otpverify = (e) => {
        console.log(otp)
        e.preventDefault();
        transport.post(`${process.env.REACT_APP_API_URL}/verifyotp`, {otp: otp, email: userDetails.email}).then((res) => {
            if (res.status != 200) {
                throw new Error(res.data);
            }

            toast.success(`OTP verified`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setVerify(true)
            setButtons({...buttons, verifyButton: true})
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
            setButtons({...buttons, verifyButton: false})
            console.log(err)
        })
    }
    const changepassword = (e) => {
        console.log(userDetails)
        setButtons({...buttons, submitButton: true})
        e.preventDefault();
        if (confirmpassword == userDetails.password) {
            transport.post(`${process.env.REACT_APP_API_URL}/changepassword`, {...userDetails, secret: "asdasdknafnalkdfsdnfusdkljsfs"}).then((res) => {
                if (res.status != 200) {
                    throw new Error(res.data);
                }
                setSuccess("passsword reset successfull");
                setError(null)
                setRedirect(true)
            }).catch(err => {
                setError(err.message)
                setSuccess(null)
                console.log(err)
            })
        }
        else {

            toast.error(`password mismatched`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    if (isAuthenticated.status) return <Redirect to='/' />
    else if (redirect) return <Redirect to='/' />
    return (
        <>
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
                            Reset Password
                        </Typography>
                        <Box component="form" noValidate sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={(e) => {
                                    setUserDetails({...userDetails, email: e.target.value});
                                    setButtons({...buttons, sendButton: false, verifyButton: true, submitButton: true})
                                }}
                                id="email"
                                label="Email Address"
                                name="email"
                                value={userDetails.email}
                                autoComplete="email"
                                autoFocus
                            />

                            <Button
                                variant="contained"
                                className={settingStyle(buttons.sendButton)}
                                sx={{mt: 3, mb: 2}}
                                onClick={e => {sendotp(e)}}
                                disabled={buttons.sendButton}
                            >
                                Send otp
                            </Button>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                onChange={(e) => {setOtp(e.target.value)}}
                                name="otp"
                                value={otp}
                                label="OTP"
                                type="text"
                                id="password"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                className={settingStyle(buttons.verifyButton)}
                                sx={{mt: 3, mb: 2}}
                                onClick={(e) => otpverify(e)}
                                disabled={buttons.verifyButton}
                            >
                                verify otp
                            </Button>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                value={userDetails.password}
                                name="New passoword"
                                label="New password"
                                type="password"
                                onChange={(e) => {
                                    setUserDetails({...userDetails, password: e.target.value});
                                    setButtons({...buttons, submitButton: !verify})
                                }}
                                id="password"
                            />

                            <TextField
                                margin="normal"
                                required
                                value={confirmpassword}
                                type="password"
                                fullWidth
                                name="Confirm password"
                                label="Confirm password"
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setButtons({...buttons, submitButton: !verify})
                                }}
                                id="password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                onClick={(e) => changepassword(e)}
                                variant="contained"
                                className={resetButton() ? "disable-sign-in" : "sign-in"}
                                disabled={resetButton()}
                                sx={{mt: 3, mb: 2}}
                            >
                                Reset Password
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </>
    );
}
