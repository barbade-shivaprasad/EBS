import {useState, useEffect} from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Components/Footer'
import './App.css'
import Alert from '@mui/material/Alert'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import Admin from './hocs/Admin';
import Event from './Components/Event';
import Navbar from './Components/Navbar';
import SignUp from './Components/signUp';
import axios from 'axios';
import ForgotPassword from './Components/forgotpassword'

import Scanner from './Components/Scanner';

const App = () => {
    const notifySuccess = (msg) => {
        toast.success(`${msg}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const [redirect, setRedirect] = useState('');
    const REACT_APP_API_URL = process.env.REACT_APP_API_URL
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isAuthenticated, setisAuthenticated] = useState({status: false, isAdmin: false})
    const main = async () => {
        let transport = axios.create({withCredentials: true});
        console.log("App js", localStorage.getItem('token'))
        transport.post(`${REACT_APP_API_URL}/verifyuser`,
            {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setisAuthenticated({...isAuthenticated, status: true})
                return;
            }
        }).catch(err => {
            console.log(err)
        })

        transport.post(`${REACT_APP_API_URL}/admin/verifyadmin`,
            {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setisAuthenticated({...isAuthenticated, status: true, isAdmin: true})
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        main()
    }, [])

    return (
        <Router>
            <Navbar setRedirect={setRedirect} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} />
            {error ? <Alert key="error" onClose={() => {setError(null)}} className='error br-0' variant="filled" severity="error">
                {error}            </Alert> : <></>}
            {success ? <Alert key="success" onClose={() => {setSuccess(null)}} className='success br-0' variant="filled" severity="success">
                {success}            </Alert> : <></>}
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' >
                    <Login redirect={redirect} setRedirect={setRedirect} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} error={error} setError={setError} />
                </Route>
                <Route exact path='/admin'>
                    <Admin isAdmin={isAuthenticated.isAdmin} setError={setError} setSuccess={setSuccess} />
                </Route>
                <Route path='/event/:eventId'>
                    <Event setRedirect={setRedirect} isAuthenticated={isAuthenticated} setError={setError} setSuccess={setSuccess} />
                </Route>
                <Route exact path='/signup'>
                    <SignUp notifySuccess={notifySuccess} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} error={error} setError={setError} success={success} setSuccess={setSuccess} />
                </Route>

                <Route exact path='/resetpassword' >
                    <ForgotPassword notifySuccess={notifySuccess} setisAuthenticated={setisAuthenticated} isAuthenticated={isAuthenticated} error={error} setError={setError} setSuccess={setSuccess} />
                </Route>

                <Route exact path='/scanner'>
                    <Scanner isAuthenticated={isAuthenticated} setisAuthenticated={setisAuthenticated} />
                </Route>

            </Switch>
            <Footer />
        </Router>)
};

export default App;
