import React from 'react';

function Hero() {
    return (

        <div
            className='container-fluid'
            style={{
                backgroundColor: "#387ed1",
                minHeight: "380px"
            }}
        >

            <div className='container py-5 text-white'>

                {/* Top Row */}
                <div className='d-flex justify-content-between align-items-center flex-wrap mb-5'>

                    <h4 className=''>
                        Support Portal
                    </h4>

                    <a
                        href='/'
                        className='text-white'
                        style={{
                            textDecoration: "none",
                            borderBottom: "1px solid white"
                        }}
                    >
                        Track tickets
                    </a>

                </div>

                {/* Main Content */}
                <div className='row align-items-center gy-5'>

                    {/* Left Section */}
                    <div className='col-lg-7'>

                        <h3
                            className=''
                            style={{
                                fontSize: "25px",
                                lineHeight: "1.2"
                            }}
                        >
                            Search for an answer or browse help topics
                            to create a ticket
                        </h3>

                        {/* Search Box */}
                        <div
                            className='bg-white d-flex align-items-center px-4 mt-3'
                            style={{
                                borderRadius: "10px",
                                height: "65px"
                            }}
                        >

                            <input
                                type='text'
                                placeholder='Eg: how do I activate F&O, why is my order getting rejected ...'
                                className='form-control border-0 shadow-none'
                                style={{
                                    fontSize: "14px"
                                }}
                            />

                            <i
                                className="fa-solid fa-magnifying-glass text-muted fs-5"
                            ></i>

                        </div>

                        {/* Quick Links */}
                        <div className='mt-4 d-flex flex-wrap gap-4'>

                            <a href='/' className='text-white hero-link' >
                                Track account opening
                            </a>

                            <a href='/' className='text-white hero-link'>
                                Track segment activation
                            </a>

                            <a href='/' className='text-white hero-link'>
                                Intraday margins
                            </a>

                            <a href='/' className='text-white hero-link'>
                                Kite user manual
                            </a>

                        </div>

                    </div>

                    {/* Right Section */}
                    <div className='col-lg-5'>

                        <div
                            className='bg-white p-4'
                            style={{
                                borderRadius: "18px",
                                color: "#424242"
                            }}
                        >

                            <h4 className='fw-semibold mb-4'>
                                Featured
                            </h4>

                            <ol
                                style={{
                                    lineHeight: "2"
                                }}
                            >

                                <li>
                                    <a href='/' className='featured-link'>
                                        Current Takeovers and Delisting – January 2026
                                    </a>
                                </li>

                                <li>
                                    <a href='/' className='featured-link'>
                                        Latest Intraday leverages and Square-off timings
                                    </a>
                                </li>

                            </ol>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Hero;