import React, { useEffect, useRef, useState } from 'react';
import Plugin from './Common/Plugin';
import Footer from './Common/Footer';
import SideNavBar from './Common/SideNavBar';
import TopBar from './Common/TopBar';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import $ from 'jquery';
import 'parsleyjs';

export default function Settlement({ navigationPage, setNavigationPage }) {
    const [rotation, setRotation] = useState(0);

    const handleRotation = () => {
        setRotation(prevRotation => prevRotation + 360);
    };
    
    const [formVisible, setFormVisible] = useState(false);

    const openForm = () => {
        setFormVisible(true);
    };

    const closeForm = () => {
        setFormVisible(false);
    };

    const theme = createTheme({
        components: {
            MuiDataGrid: {
                styleOverrides: {
                    root: {
                        "& .MuiDataGrid-row": {
                            minHeight: "auto", // Adjust row height to make it more compact
                        },
                    },
                },
                defaultProps: {
                    density: "Compact", // Set default density to compact
                    exportButton: true,
                },
            },
        },
    });

    const columns = [
        { field: 's_no', headerName: 'S No', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell"},
        { field: 'time', headerName: 'Time', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'stlmnt_status', headerName: 'Settlement Status', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'action', headerName: 'Action', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", 
            renderCell: (params) => (<>
                <Button variant="contained" color="primary" size="small">Action</Button>
                {/* <Button variant="contained" color="primary" size="small">Edit Trans</Button> */}
            </>),
        }
    ];
    
    const rows = [
    ];

    const form = useRef(null);

    useEffect(() => {
        if (form.current) {
            $(form.current).parsley();
        }
    }, []);

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
                        {!formVisible && (
                            <div className="card my-4 addaccountbtn" style={{backgroundColor: "transparent", boxShadow: "none"}}>
                                <div className="card-body p-3">
                                    <div className="form-group">
                                        <button className="button bg-gradient-primary" type="button" onClick={openForm}>Add Account</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {formVisible && (
                            <div className="card my-4 none addaccountform">
                                <div className="card-header pb-0 px-3" style={{display: "flex", justifyContent: "space-between"}}>
                                    <h6 className="mb-0">Add Account</h6>
                                    <span><i className="material-icons opacity-10" style={{cursor: "pointer"}} onClick={closeForm}>close</i></span>
                                </div>
                                <div className="card-body p-3">
                                    <form ref={form} className="form-container">
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="bnkname">Bank Name *</label>
                                                <select type="text" id="bnkname" name="bnkname" data-parsley-required required>
                                                    <option value="">Select</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="ifsc">IFSC Code *</label>
                                                <input type="text" id="ifsc" name="ifsc" placeholder="Enter IFSC Code" required data-parsley-required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="acctype">Account Type *</label>
                                                <select id="acctype" name="acctype" required data-parsley-required >
                                                    <option value="">Select</option>
                                                    <option value="current">Current</option>
                                                    <option value="saving">Saving</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="account">Account Number*</label>
                                                <input type="text" id="account" name="account" placeholder="Enter Account" required data-parsley-required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="account">Confirm Account Number*</label>
                                                <input type="text" id="conf_account" name="conf_account" placeholder="Enter Account" required data-parsley-required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="benename">Bene Name *</label>
                                                <input type="text" id="benename" name="benename" placeholder="Enter Bene Name" required data-parsley-required />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="form-group">
                                                <label htmlFor="benemob">Bene Mobile *</label>
                                                <input type="text" id="benemob" name="benemob" placeholder="Enter Bene Mobile" required data-parsley-required />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="beneemail">Bene Email *</label>
                                                <input type="text" id="beneemail" name="beneemail" placeholder="Enter Bene Email" required data-parsley-required />
                                            </div>
                                        </div>
                                        <div className="row" style={{marginTop: "10px"}}>
                                            <div className="form-group" style={{display: "block", paddingLeft:"12px"}}>
                                                <input type="checkbox" id="verify_account" name="verify_account" style={{height: "auto"}}/>
                                                <label htmlFor="verify_account">Verify Account Number</label>
                                            </div>
                                            <div className="form-group">
                                                <button className="button bg-gradient-primary" type="submit">Add</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
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
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Settlement Requests</h6>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                {/* <table id="example" className="table table-striped table-bordered" style={{width: "100%"}}>
                                    <thead>
                                        <tr>
                                            <th>S No</th>
                                            <th>Time</th>
                                            <th>Settlement Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table> */}
                                <ThemeProvider theme={theme}>
                                    <Box className="tbl_container">
                                        <DataGrid className="tbl_innr_box" rows={rows}
                                            columns={columns.map(column => ({
                                            ...column,
                                            //flex: 1
                                            }))}
                                            pagination
                                            disableRowSelectionOnClick
                                            slots={{ toolbar: GridToolbar }}
                                        />
                                    </Box>
                                </ThemeProvider>
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