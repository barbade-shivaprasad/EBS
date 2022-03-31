import axios from 'axios';
import {useEffect} from 'react'
import React from 'react';
import QrScanner from 'qr-scanner';
import '../App.css';
import {useHistory, Redirect} from 'react-router-dom'
function Scanner({isAuthenticated}) {
    const history = useHistory();

    const main = async () => {

        let videoele = document.getElementById('video')
        const qrScanner = new QrScanner(videoele, result => {
            console.log(result)
            if (result) {
                let a = result.split('-');
                if (a[0] != "asdhhakdoisauoaidgfiudgfiiau") {
                    qrScanner.stop()
                    window.alert("Invalid QR")
                }
                else {
                    axios.post(`${process.env.REACT_APP_API_URL}/isAttended`, {email: a[1], eventId: a[2]}).then(res => {
                        window.alert(res.data)
                    })


                }
            }

        });
        qrScanner.start();
    }

    const main2 = async () => {
        let transport = axios.create({withCredentials: true});

        transport.post(`${process.env.REACT_APP_API_URL}/admin/verifyadmin`,
            {}, {
            headers: {
                'Authorization': `${localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log(res.data)
            if (res.status == 200) {
                // setLoading(false)
            } else {
                history.push('/')
                console.log('hellow rodl')
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    useEffect(() => {
        main2();
    }, [])
    return (
        <div className="App">
            <div ><button className='button' onClick={e => main()}>
                start
            </button></div>
            <div className='video'><video id='video'></video></div>
        </div>
    );
}

export default Scanner;
