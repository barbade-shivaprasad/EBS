import React, {useState, useEffect} from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {useParams} from "react-router-dom";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {useHistory} from "react-router-dom/cjs/react-router-dom.min";


const date = new Date();
const Event = ({isAuthenticated, setError, setSuccess, setRedirect}) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [buttonState, setButtonState] = useState(false)
    const main = async () => {
        let transport = axios.create({withCredentials: true});

        transport.post(`${process.env.REACT_APP_API_URL}/admin/verifyadmin`,
            {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                setIsAdmin(true)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const history = useHistory();
    console.log(isAuthenticated)
    const [eventDetails, seteventDetails] = useState(null);
    console.log(eventDetails);
    let {eventId} = useParams();
    const [isregistered, setIsRegistered] = useState(false);
    console.log(isregistered);

    console.log(eventDetails)
    const isEventCompleted = () => {
        // let eventDate = eventDetails.updatedAt;
        // console.log("hello world", date.getDate(), date.getMonth(), date.getFullYear(), parseInt(eventDetails?.date.slice(0, 4)), parseInt(eventDetails?.date.slice(5, 7)), parseInt(eventDetails?.date.slice(8, 10)))
        if (parseInt(eventDetails?.date?.slice(0, 4)) < date.getFullYear()) {
            return true;
        }
        else if (parseInt(eventDetails?.date?.slice(5, 7)) < date.getMonth()) {
            return true
        }
        else if (parseInt(eventDetails?.date?.slice(8, 10)) < date.getDate()) {
            return true
        }
        return false
    }
    useEffect((e) => {
        console.log(eventId);
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/getevent`,
                {eventId: eventId}
            )
            .then((res) => {
                console.log(res.data);
                seteventDetails(res.data[0]);
            })
            .catch((err) => console.log(err));
        axios
            .post(`${process.env.REACT_APP_API_URL}/userdetails`, {eventId: eventId},
                {
                    headers: {
                        'Authorization': `${localStorage.getItem("token")}`,
                    }
                })
            .then((e) => {
                console.log(e);
                if (e.status == 200) {
                    setIsRegistered(true);
                }
            })
            .catch((err) => console.log(err));
        main();
    }, []);
    console.log("isCompleted ", isEventCompleted())
    const registerHandler = (e) => {
        setButtonState(true)
        if (!isAuthenticated.status) {
            setRedirect(`event/${eventId}`)
            history.push('/login');
        }
        const url = `${process.env.REACT_APP_API_URL}/addevent`;
        let data = {};
        data["eventId"] = eventId;
        data["isRegistered"] = true;
        data["isAttended"] = false;
        data["isCancelled"] = false;
        console.log(data);
        axios
            .post(url, data, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                }
            })
            .then((res) => {
                if (res.status != 200) {
                    throw new Error(res.data)
                }
                console.log("server response", res.data);
                setIsRegistered(true);
                // setSuccess("Registration mail sent.")

                toast.success(`Registration mail  sent`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setError(null)
            })
            .catch((err) => {

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
                setIsRegistered(false)
                console.log(err)
            });
    };
    return (
        <>
            <ToastContainer />
            {eventDetails == null ? (
                <>Loading..</>
            ) : (
                <>
                    <div className="container" style={{minHeight: "20rem"}}>
                        <div className=" mb-3 mt-4 text-center event-title">
                            {eventDetails.title}
                        </div>
                        <div className="eventPoster text-center">
                            <img
                                className="eventImage"
                                src={`${process.env.REACT_APP_API_URL}/admin/getimg/${eventId}`}
                                alt="poster"
                                style={{maxWidth: "70%", objectFit: "contain"}}
                            />
                        </div>
                        <div className="eventDetails container">
                            <div className="group">
                                <div className="head mb-4"> Description</div>
                                <ReactMarkdown
                                    children={eventDetails.description}
                                    remarkPlugins={[remarkGfm]}
                                />
                            </div>
                            <div className="">
                                <div className="">
                                    <b>Panel:{" "}</b>
                                    <span className="panelName">{eventDetails.organizedBy}</span>
                                </div>
                            </div>
                            <div className="">
                                <div className="">
                                    <b>Date:</b> <span className="panelName">{eventDetails.date.slice(0, 10)}</span>
                                </div>
                            </div>
                            {isAdmin ?
                                <div className="group">
                                    <div className="head">
                                        Number of Registrations: <span className="panelName">{eventDetails.seatsFilled}</span>
                                    </div>
                                </div> : <></>
                            }
                            <div className="buttonDiv">
                                {!isregistered ? (
                                    <button
                                        type="button"
                                        className="btn btn-success btn-lg btn-block"
                                        onClick={(e) => registerHandler(e)}
                                        disabled={buttonState || isEventCompleted()}
                                    >
                                        Register
                                    </button>
                                ) : (
                                    <button
                                        type="text"
                                        disabled={true}
                                        className="btn btn-secondary btn-lg btn-block"
                                    >
                                        Registered
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Event;
