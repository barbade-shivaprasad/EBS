import React from 'react';
import {MDBCol, MDBContainer, MDBRow, MDBFooter} from "mdbreact";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram,
    faTelegram
} from "@fortawesome/free-brands-svg-icons";

import './home.css';

const Footer = () => {
    return (
        <div className="container-fluid footer" style={{backgroundColor: "#101725"}}>
            <MDBFooter color="black" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6">
                            <h5 className="title" style={{color: "white"}}>Event Booking Site</h5>
                            <p>
                                Student Governing Council <br />
                                RGUKT Basar
                            </p>
                        </MDBCol>
                        <MDBCol md="6">
                            <div className='align'>
                                <ul style={{textAlign: "left"}}>
                                    <li className="list-unstyled">
                                        <span className="p-2"><FontAwesomeIcon icon={faFacebook} size="1x" /></span>
                                        <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Facebook</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <span className="p-2"><FontAwesomeIcon icon={faInstagram} size="1x" /></span>
                                        <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Instagram</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <span className="p-2"><FontAwesomeIcon icon={faTwitter} size="1x" /></span>
                                        <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Twitter</a>
                                    </li>
                                    <li className="list-unstyled">
                                        <span className="p-2"><FontAwesomeIcon icon={faTelegram} size="1x" /></span>
                                        <a href="#!" style={{textDecoration: 'none', color: '#fff'}}>Telegram</a>
                                    </li>
                                </ul>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()}<a href="#" style={{textDecoration: 'none', color: '#fefefe'}}> SGC RGUKT Basar</a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    )
}

export default Footer;
