import React from 'react';
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import PharmacyLogo from '../../assets/Pharmacylogo.mp4'

import './home-style.css'

function Home(props) {
    return (
        <>
            <div className="home-contents">
                <center>
                    <div className="home-text">
                        You could request an appointment with our team.
                    </div>
                    <div className="button-wrapper">
                        <Link to='/appointment'>
                                <Button className="button">
                                    Request an appointment
                                </Button>
                        </Link>
                    </div>
                </center>
            </div>
            <div className="iframe-container">
                {
                    /* <iframe src="https://www.youtube.com
                    /embed/zmZ7Pfjymr0?vq=hd1080&playlist=zmZ7Pfjymr0&mute=1&autoplay
                    =1&loop=1&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&the
                    me=light&fs=0&color=white&controls=0&disablekb=1" width="560" heigh
                    t="315" frameborder="0"></iframe>​ */
                }
                <video width="320" height="240" loop="on" muted="on" autoPlay="on">
                    <source src={PharmacyLogo} type="video/mp4" />
                </video>
            </div>
        </>

    );
}

export default Home;
