import React, { useEffect, useRef, useState } from 'react';
import Plugin from './Common/Plugin';
import SideNavBar from './Common/SideNavBar';
import TopBar from './Common/TopBar';
import Footer from './Common/Footer';
import $ from 'jquery';
import 'parsleyjs';

export default function AddFund({ navigationPage, setNavigationPage }) {
    const [rotation, setRotation] = useState(0);

    const handleRotation = () => {
        setRotation(prevRotation => prevRotation + 360);
    };

    const formRef = useRef(null);
    const formRefAddFund = useRef(null);

    useEffect(() => {
        if (formRef.current) {
            $(formRef.current).parsley();
        }
        if (formRefAddFund.current) {
            $(formRefAddFund.current).parsley();
        }
    }, []);

    return (<>
    {/* Sidebar */}
    <SideNavBar setNavigationPage={setNavigationPage}></SideNavBar>
    {/* End Sidebar */}

    <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

        {/* Navbar */}
        <TopBar  navigationPage={navigationPage}></TopBar>
        {/* End Navbar */}

        <div className="container-fluid">
            
            <div className="row">
                <div className="col-xl-7">
                    <div className="card my-4">
                        {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 className="text-white text-capitalize ps-3">Fund Request</h6>
                            </div>
                        </div> */}
                        <div className="card-body p-3">
                            <div><h6> Fund Request</h6></div>
                            <form ref={formRef} className="form-container pt-3">
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="select-bank">Bank Account *</label>
                                        <select id="bank" name="bank" required data-parsley-required>
                                            <option value="">Select Bank</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="req-amount">Amount *</label>
                                        <input type="text" id="req-amount" name="req-amount" placeholder="Enter Amount" required data-parsley-required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="txnType">Transfer Type *</label>
                                        <select id="txnType" name="txnType" required data-parsley-required>
                                            <option value="">Select</option>
                                            <option value="UPI">UPI</option>
                                            <option value="IMPS">IMPS</option>
                                            <option value="NEFT">NEFT</option>
                                            <option value="RTGS">RTGS</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="utr">UTR *</label>
                                        <input type="text" id="utr" name="utr" placeholder="Enter UTR" required data-parsley-required />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="form-group">
                                        <label htmlFor="remark">Remark *</label>
                                        <input type="text" id="remark" name="remark" placeholder="Enter Remark" required data-parsley-required />
                                    </div>
                                    <div className="form-group mt-4">
                                        <button className="button bg-gradient-primary" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
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
                                        <a className="change-btn active">
                                            <i className="fa fa-caret-up up-ico"></i>Change
                                            <span className="reload-icon" onClick={handleRotation} style={{ transform: `rotate(${rotation}deg)` }}>
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
            
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 className="text-white text-capitalize ps-3">Add Fund</h6>
                            </div>
                        </div> */}
                        <div className="card-body p-3">
                            <div><h6>Add Fund</h6></div>
                            <form ref={formRefAddFund} className="form-container pt-3">
                                <div className="row">                                    
                                    <div className="form-group add-fund">
                                        <label htmlFor="amount">Amount *</label>
                                        <input type="text" id="amount" name="amount" placeholder="Enter Amount" required data-parsley-required />
                                    </div>
                                    <div className="form-group add-fund">
                                        <label htmlFor="paymentType">Payment Type *</label>
                                        <select id="paymentType" name="paymentType" required data-parsley-required>
                                            <option value="">Select</option>
                                            <option value="QR">QR</option>
                                            <option value="Payment-Link">Payment Link</option>
                                        </select>
                                    </div>
                                    <div className="form-group add-fund mt-4">
                                        <button className="button bg-gradient-primary" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-xl-12">
                    <div className="card my-4">
                        {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                            <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                              <h6 className="text-white text-capitalize ps-3">Account Details</h6>
                            </div>
                        </div> */}
                        <div className="card-body p-3">
                            <div><h6> Account Details</h6></div>
                            <div className="row pt-3">
                                <div className="col-xl-6">                                    
                                    <div><label className="bold">Company  name: <span> Suvidhaa Group</span></label></div>
                                    <div><label className="bold">Account number: <span> 0948609099</span></label></div>
                                    <div><label className="bold">IFSC: <span> KKBK0000180</span></label></div>
                                    <div><label className="bold">Bank name: <span> Kotak Bank</span></label></div>
                                    <div><label className="bold">Branch: <span> Noida - Sector 18 Branch</span></label></div>
                                </div>

                                <div className="col-xl-6">                                    
                                    <div><label className="bold">Company  name: <span> Suvidhaa Group</span></label></div>
                                    <div><label className="bold">Account number: <span> 35095070896</span></label></div>
                                    <div><label className="bold">IFSC: <span> SBIN0016739</span></label></div>
                                    <div><label className="bold">Bank name: <span> SBI BANK</span></label></div>
                                    <div><label className="bold">Branch: <span> Noida - Sector 18 Branch</span></label></div>
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