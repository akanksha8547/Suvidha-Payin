import React, { useState } from 'react'
import Plugin from './Common/Plugin';
import SideNavBar from './Common/SideNavBar';
import TopBar from './Common/TopBar';
import Footer from './Common/Footer';
import DateRangePicker from './Common/DateRangePicker';
import { Box, Button, createTheme, ThemeProvider } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

export default function PayinRequest({ navigationPage, setNavigationPage }) {
    const [rotation, setRotation] = useState(0);

    const handleRotation = () => {
        setRotation(prevRotation => prevRotation + 360);
    };

    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    console.log(dateRange.start, dateRange.end)

    const handleDateChange = (start, end) => {
        setDateRange({ start, end });
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
        { field: 'id_no', headerName: 'Id No', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell"},
        { field: 'date_time', headerName: 'Date & Time', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'member_name', headerName: 'Member Name', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'member_mobile', headerName: 'Member Mobile', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'order_id', headerName: 'Order Id', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'ref_id', headerName: 'Ref Id', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'opening_balance', headerName: 'Opening Balance', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130}, 
        { field: 'order_amount', headerName: 'Order Amount', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130}, 
        { field: 'closing_balance', headerName: 'Closing Balance', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'upi_txn_id', headerName: 'UPI Txn Id', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width: 130},
        { field: 'status', headerName: 'Status', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'charge', headerName: 'Charge', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'gst', headerName: 'GST', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'tds', headerName: 'TDS', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'txn_time', headerName: 'TXN Time', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'message', headerName: 'Message', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'remark', headerName: 'Remark', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'txn_date', headerName: 'Txn Date', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'create_date', headerName: 'Create Date', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", width:130},
        { field: 'action', headerName: 'Action', headerAlign: "center",  align: "center", cellClassName: "super-app-theme--cell", 
            renderCell: (params) => (<>
                <Button variant="contained" color="primary" size="small">Action</Button>
                {/* <Button variant="contained" color="primary" size="small">Edit Trans</Button> */}
            </>),
        }
    ];
    
    const rows = [
    ];

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
                                <h6 className="text-white text-capitalize ps-3">Filter Options</h6>
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
                                            <label htmlFor="rows">Select Rows *</label>
                                            <select id="rows" name="rows">
                                                <option value="100">100</option>
                                                <option value="200">200</option>
                                                <option value="500">500</option>
                                                <option value="1000">1000</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="status">Status *</label>
                                            <select id="status" name="status">
                                                <option value="All">All</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Created">Created</option>
                                                <option value="Success">Success</option>
                                                <option value="Failed">Failed</option>
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="amount">Amount *</label>
                                            <input type="text" id="amount" name="amount" placeholder="Enter Amount" />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="form-group">
                                            <label htmlFor="txn-number">Merchant Txn Number *</label>
                                            <input type="text" id="txn-number" name="txn-number" placeholder="Enter Txn Number" />
                                        </div>
                                        {/* <div className="form-group">
                                            <label htmlFor="type">Type *</label>
                                            <select id="type" name="type">
                                                <option value="search">Search</option>
                                                <option value="download">Download</option>
                                            </select>
                                        </div> */}
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
                            <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                <div className="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                                <h6 className="text-white text-capitalize ps-3">Payin Request Table</h6>
                                </div>
                            </div>
                            <div className="card-body p-3">
                                {/* <table id="example" className="table table-striped table-bordered" style={{width: "100%"}}>
                                    <thead>
                                        <tr>
                                            <th>Id No</th>
                                            <th>Date & Time</th>
                                            <th>Member Name</th>
                                            <th>Member Mobile</th>
                                            <th>Order Id</th>
                                            <th>Ref Id</th>
                                            <th>Opening Bal</th>
                                            <th>Order Amount</th>
                                            <th>Closing Balance</th>
                                            <th>UPI Txn Id</th>
                                            <th>Status</th>
                                            <th>Charge</th>
                                            <th>GST</th>
                                            <th>TDS</th>
                                            <th>Txn Time</th>
                                            <th>Message</th>
                                            <th>Remark</th>
                                            <th>Txn Date</th>
                                            <th>Create Date</th>
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