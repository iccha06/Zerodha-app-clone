import React from 'react';

function Pricing() {
    return (
        <div className='container py-5'>
            <div className='row align-items-start'>

                {/* Left Section */}
                <div className='col-lg-5 py-4'>
                    <h1 className='fs-2 mb-3'>Unbeatable pricing</h1>

                    <p className='text-muted'>
                        We pioneered the concept of discount broking and price transparency in India.
                        Flat fees and no hidden charges.
                    </p>

                    <a
                        href='/explore'
                        style={{ textDecoration: "none", fontSize: "1.1rem" }}
                    >
                        See pricing <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>
                </div>

                {/* Right Section */}
                <div className='col-lg-7 py-4'>
                    <div className='row text-center align-items-start'>

                        {/* First */}
                        <div className='col-4 d-flex align-items-center gap-2'>
                            <img
                                src='/images/pricing0.svg'
                                alt='₹0'
                                style={{ width: "100px" }}
                            />
                            <p className='text-muted text-start mb-0' style={{ fontSize: 13 }}>
                                Free account <br /> opening
                            </p>
                        </div>

                        {/* Second */}
                        <div className='col-4 d-flex align-items-center gap-2'>
                            <img
                                src='/images/pricing0.svg'
                                alt='₹0'
                                style={{ width: "100px" }}
                            />
                            <p className='text-muted text-start mb-0' style={{ fontSize: 13 }}>
                                Free equity delivery <br />
                                and direct mutual funds
                            </p>
                        </div>

                        {/* Third */}
                        <div className='col-4 d-flex align-items-center gap-2'>
                            <img
                                src='/images/intradayTrades.svg'
                                alt='₹20'
                                style={{ width: "100px" }}
                            />
                            <p className='text-muted text-start mb-0' style={{ fontSize: 13 }}>
                                Intraday and <br /> F&O
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Pricing;