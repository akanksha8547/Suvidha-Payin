import React, { useState } from 'react';
import SideNavBar from './Common/SideNavBar';
import TopBar from './Common/TopBar';
import Plugin from './Common/Plugin';
import Footer from './Common/Footer';

export default function APICredentials({ navigationPage, setNavigationPage }) {
    const [rotation, setRotation] = useState(0);

    const handleRotation = () => {
        setRotation(prevRotation => prevRotation + 360);
    };

    return (<>
        {/* Sidebar */}
        <SideNavBar setNavigationPage={setNavigationPage}></SideNavBar>
        {/* End Sidebar */}

        <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            {/* Navbar */}
            <TopBar navigationPage={navigationPage}></TopBar>
            {/* End Navbar */}

            <div className="container-fluid">

                <div className="row">
                    <div className="col-xl-7">
                        <div className="card my-4">
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Get API Credential</h6>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                <div className="form-group">
                                    <label>Merchant Name: <span>Uat Demo Account 2</span></label>
                                </div>
                                <div className="form-group">
                                    <label>Register Mobile Number: <span>8888888888</span></label>
                                </div>
                                <div className="form-group" style={{width: "auto"}}>
                                    <label>Ip WhiteList: &nbsp;
                                        <input type="text" id="ip" name="ip" value="1.22.130.245,1.22.130.4" />
                                    </label>
                                </div>
                                <div className="form-group" style={{width: "auto"}}>
                                    <label>JWT Key: &nbsp;
                                        <textarea id="ip" name="ip" value="Qk9qdXR3M0FrbjJHaDVIdThBVTE3VVdxakQvNXpRYkFqMnZKQnF1YThqaW1ZSm5Bb3FNTnlVU05qa3pCa002ejFDYURaUkNMcklZPQ==" style={{width: "603px" }}/>
                                    </label>
                                </div>
                                <div className="form-group" style={{width: "auto"}}>
                                    <label>API Key: &nbsp;
                                        <textarea id="apikey" name="apikey" value="pSFhIGrV3AM68YUetETmjxdvqLk5yioCZIwzaWnR9uPKsQDA1lHXbOBFJ704N2cRgf" style={{width: "610px" }}/>
                                    </label>
                                </div>
                                <div className="form-group" style={{width: "auto"}}>
                                    <label>Login Key: &nbsp;
                                        <textarea id="loginkey" name="loginkey" value="1630633b88e58f5f678e4c93462df354" style={{width: "597px" }}/>
                                    </label>
                                </div>
                                <div className="form-group" style={{width: "auto"}}>
                                    <label>Callback URL: &nbsp;
                                        <textarea id="callbackurl" name="callbackurl" value="https://eonl5fla6qr3yu7.m.pipedream.net" style={{width: "575px" }} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-5">
                        <div className="card" style={{backgroundColor: "transparent", boxShadow: "none"}}>
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="">
                                        <div className="card-bx bg-blue">
                                            <img className="pattern-img" src="/img/pattern6.png" alt="" />
                                            <div className="card-info text-white">
                                                <img src="/img/circle.png" className="mb-4" alt="" />
                                                <h2 className="text-white card-balance">$824,571.93</h2>
                                                <p className="fs-16">Wallet Balance</p>
                                                <span>+0,8% than last week</span>
                                            </div>
                                            <a className="change-btn active" onClick={handleRotation}>
                                                <i className="fa fa-caret-up up-ico"></i>Change
                                                <span className="reload-icon" style={{ transform: `rotate(${rotation}deg)` }}>
                                                    <i className="fas fa-sync-alt reload active"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer></Footer>
            </div>
        </main>

        <Plugin></Plugin>
    </>)
}