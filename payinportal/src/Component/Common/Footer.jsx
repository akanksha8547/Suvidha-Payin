import React from 'react';

export default function Footer() {
    return (
        <footer className="footer py-4" style={{marginRight: "70px"}}>
            <div className="container-fluid">
                <div className="row align-items-center justify-content-lg-between">
                    <div className="col-lg-6 mb-lg-0 mb-4">
                        <div className="copyright text-center text-sm text-muted text-lg-start">
                            © {(new Date().getFullYear())},
                            made with <i className="fa fa-heart"></i> by &nbsp;
                            <a href="https://suvidhaabnk.com" className="font-weight-bold" target="_blank">Suvidha Bnk</a>
                            &nbsp; for a better web experience.
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                            <li className="nav-item">
                                <a href="https://suvidhaabnk.com" className="nav-link text-muted" target="_blank">Suvidha Bnk</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://suvidhaabnk.com/about-us" className="nav-link text-muted" target="_blank">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a href="https://suvidhaabnk.com/contact" className="nav-link text-muted" target="_blank">Contact Us</a>
                            </li>
                            {/* <li className="nav-item">
                                <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-muted" target="_blank">License</a>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}