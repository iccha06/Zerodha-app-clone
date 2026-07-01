import React from 'react';

function Awards() {
    return (
        <div className='container py-3'>
            <div className='row align-items-start'>

                {/* Left Image */}
                <div className='col-lg-6 py-3 d-flex justify-content-start'>
                    <img
                        src='src/images/largestBroker.svg'
                        alt='largest broker'
                        style={{ width: "85%" }}
                    />
                </div>

                {/* Right Content */}
                <div className='col-lg-6 py-3'>

                    <h1 className='fs-2 mb-3'>
                        Largest stock broker in India
                    </h1>

                    <p className='text-muted mb-4'>
                        That's why 1.6+ crore customers trust Zerodha with ~ ₹6 lakh crores of equity investments,
                        making us India’s largest broker; contributing to 15% of daily retail exchange volumes in India.
                    </p>

                    {/* Lists */}
                    <div className='row mb-4'>

                        <div className='col-6'>
                            <ul className='text-muted'>
                                <li className='mb-2'>Futures and Options</li>
                                <li className='mb-2'>Commodity and Derivatives</li>
                                <li className='mb-2'>Currency Derivatives</li>
                            </ul>
                        </div>

                        <div className='col-6'>
                            <ul className='text-muted'>
                                <li className='mb-2'>Stocks and IPOs</li>
                                <li className='mb-2'>Direct Mutual Funds</li>
                                <li className='mb-2'>Bonds and Gov. Securities</li>
                            </ul>
                        </div>

                    </div>

                    {/* Press Image */}
                    <img
                        src='src/images/pressLogos.png'
                        alt='press logos'
                        style={{ width: "90%" }}
                    />

                </div>

            </div>
        </div>
    );
}

export default Awards;