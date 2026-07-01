import React from 'react';

function Education() {
    return (
        <div className='container py-5'>
            <div className='row align-items-center'>

                {/* Left Image Section */}
                <div className='col-lg-6 mb-5'>
                    <img
                        src='src/images/index-education.svg'
                        alt='education'
                        style={{ width: "75%" }}
                    />
                </div>

                {/* Right Content Section */}
                <div className='col-lg-6 py-4'>

                    <h1 className='fs-2 mb-3'>
                        Free and open market education
                    </h1>

                    <p className='text-muted mb-3'>
                        Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.
                    </p>

                    <a
                        href='/explore'
                        className='d-inline-block mb-4'
                        style={{ textDecoration: "none", fontSize: "1.1rem" }}
                    >
                        Varsity <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>

                    <p className='text-muted mb-3'>
                        TradingQ&A, the most active trading and investment community in India for all your market related queries.
                    </p>

                    <a
                        href='/explore'
                        className='d-inline-block'
                        style={{ textDecoration: "none", fontSize: "1.1rem" }}
                    >
                        TradingQ&A <i className="fa-solid fa-arrow-right ms-2"></i>
                    </a>

                </div>

            </div>
        </div>
    );
}

export default Education;