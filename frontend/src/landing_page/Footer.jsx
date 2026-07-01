import React from 'react';

function Footer() {
    return (
        <footer className='container-fluid bg-light border-top mt-5'>

            <div className='container py-5'>

                <div className='row gy-5'>

                    {/* Left Section */}
                    <div className='col-lg-4'>

                        <img
                            src='src/images/logo.svg'
                            alt='logo'
                            style={{ width: "140px" }}
                            className='mb-4'
                        />

                        <p
                            className='text-muted'
                            style={{
                                fontSize: "14px",
                                lineHeight: "1.8"
                            }}
                        >
                            © 2010 - 2026, Zerodha Broking Ltd.
                            <br />
                            All rights reserved.
                        </p>

                        {/* Social Icons */}
                        <div className='d-flex gap-4 mt-4 fs-5'>

                            <a href='#' className='text-secondary footer-icon'>
                                <i className="fa-brands fa-x-twitter"></i>
                            </a>

                            <a href='#' className='text-secondary footer-icon'>
                                <i className="fa-brands fa-facebook"></i>
                            </a>

                            <a href='#' className='text-secondary footer-icon'>
                                <i className="fa-brands fa-instagram"></i>
                            </a>

                            <a href='#' className='text-secondary footer-icon'>
                                <i className="fa-brands fa-linkedin"></i>
                            </a>

                        </div>

                        {/* App Buttons */}
                        <div className='d-flex gap-3 mt-4 flex-wrap'>

                            <img
                                src='https://zerodha.com/static/images/google-play-badge-light.svg'
                                alt='playstore'
                                style={{ width: "135px", cursor: "pointer" }}
                            />

                            <img
                                src='https://zerodha.com/static/images/appstore-badge-light.svg'
                                alt='appstore'
                                style={{ width: "135px", cursor: "pointer" }}
                            />

                        </div>

                    </div>

                    {/* Right Links Section */}
                    <div className='col-lg-8'>

                        <div className='row'>

                            {/* Account */}
                            <div className='col-md-3 col-6 mb-4'>

                                <h6 className='fw-bold mb-4 text-dark'>
                                    Account
                                </h6>

                                <ul className='list-unstyled footer-links'>

                                    <li><a href='#'>Open demat account</a></li>
                                    <li><a href='#'>Minor demat account</a></li>
                                    <li><a href='#'>NRI demat account</a></li>
                                    <li><a href='#'>HUF demat account</a></li>
                                    <li><a href='#'>Commodity</a></li>
                                    <li><a href='#'>Dematerialisation</a></li>

                                </ul>

                            </div>

                            {/* Support */}
                            <div className='col-md-3 col-6 mb-4'>

                                <h6 className='fw-bold mb-4 text-dark'>
                                    Support
                                </h6>

                                <ul className='list-unstyled footer-links'>

                                    <li><a href='#'>Contact us</a></li>
                                    <li><a href='#'>Support portal</a></li>
                                    <li><a href='#'>Downloads</a></li>
                                    <li><a href='#'>Circulars</a></li>

                                </ul>

                            </div>

                            {/* Company */}
                            <div className='col-md-3 col-6 mb-4'>

                                <h6 className='fw-bold mb-4 text-dark'>
                                    Company
                                </h6>

                                <ul className='list-unstyled footer-links'>

                                    <li><a href='#'>About</a></li>
                                    <li><a href='#'>Careers</a></li>
                                    <li><a href='#'>Press & media</a></li>
                                    <li><a href='#'>Zerodha Cares</a></li>

                                </ul>

                            </div>

                            {/* Quick Links */}
                            <div className='col-md-3 col-6 mb-4'>

                                <h6 className='fw-bold mb-4 text-dark'>
                                    Quick links
                                </h6>

                                <ul className='list-unstyled footer-links'>

                                    <li><a href='#'>Brokerage charges</a></li>
                                    <li><a href='#'>Market holidays</a></li>
                                    <li><a href='#'>Economic calendar</a></li>
                                    <li><a href='#'>IPOs</a></li>

                                </ul>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom Disclaimer */}
                <div
                    className='border-top mt-4 pt-4 text-muted'
                    style={{
                        fontSize: "13px",
                        lineHeight: "1.8"
                    }}
                >

                    <p className='mb-2'>
                        Zerodha Broking Ltd.: Member of NSE, BSE & MCX.
                    </p>

                    <p className='mb-0'>
                        Investments in securities market are subject to market risks.
                        Read all related documents carefully before investing.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;