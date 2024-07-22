import React, { useState } from 'react';
import SideNavBar from './Common/SideNavBar';
import TopBar from './Common/TopBar';
import Footer from './Common/Footer';
import Plugin from './Common/Plugin';
import DateRangePicker from './Common/DateRangePicker';


export default function Analytics({ navigationPage, setNavigationPage }) {
    const [rotation, setRotation] = useState(0);

    const handleRotation = () => {
        setRotation(prevRotation => prevRotation + 360);
    };

    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    console.log(dateRange.start, dateRange.end)

    const handleDateChange = (start, end) => {
        setDateRange({ start, end });
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
                            {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Get API Credential</h6>
                                </div>
                            </div> */}
                            <div className="card-body p-3">
                            <form className="form-container">
                                    <div className="row">
                                    <div className="form-group">
                                            <label htmlFor="date-range">Select Date Range</label>
                                            <DateRangePicker onChange={handleDateChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="rows">Status *</label>
                                            <select id="status" name="status">
                                                <option value="select">select</option>
                                                <option value="All">All</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Created">Created</option>
                                                <option value="Success" selected>Success</option>
                                                <option value="Failed">Failed</option>
                                                <option value="Processed">Processed</option>
                                                <option value="Refunded">Refunded</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group">
                                        <label htmlFor="rows">Fund Type *</label>
                                            <select id="fundtype" name="fundtype">
                                                <option value="select">select</option>
                                                <option value="Credit">Credit</option>
                                                <option value="Debit">Debit</option>
                                                <option value="Failed">Failed</option>
                                            </select>
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

                <div className="row">
                    <div className="col-12">
                        <div className="card my-4">
                            {/* <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">API Logs Report Table</h6>
                                </div>
                            </div> */}
                            <div className="card-body p-3" style={{overflow: "auto"}}>
                                <table id="example" className="table table-striped table-bordered" style={{width: "100%"}}>
                                    <thead className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                        <tr>
                                            <th>S No</th>
                                            <th>Service</th>
                                            <th>Amount</th>
                                            <th>Charges</th>
                                            <th>Txn</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Payin</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>Payout</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>Fund Transfer</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                            <td>₹ 0</td>
                                        </tr>
                                    </tbody>
                                </table>
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