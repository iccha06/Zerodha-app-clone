import React from 'react';

function Hero() {
    return (

        <div className='container border-bottom'>

            <div className='row text-center justify-content-center'>

                <div className='col-10 p-5'>

                    <h1
                        className='fw-normal mt-5 '
                        style={{
                            fontSize: "30px",
                            color: "#424242"
                        }}
                    >
                        Charges
                    </h1>

                    <p
                        className='text-muted mt-2'
                        style={{
                            fontSize: "18px",
                            lineHeight: "1.8"
                        }}
                    >
                        List of all charges and taxes
                    </p>

                </div>

            </div>

            {/* Pricing Cards */}

            <div className='row text-center p-5'>

                <div className='col-lg-4 mb-4'>

                    <img
                        src='src/images/pricing-eq.svg'
                        alt='Equity'
                        style={{ width: "65%" }}
                    />

                    <h3 className='mt-4 fs-4'>Free equity delivery</h3>

                    <p className='text-muted mt-3'>
                        All equity delivery investments (NSE, BSE),
                        are absolutely free — ₹0 brokerage.
                    </p>

                </div>

                <div className='col-lg-4 mb-4'>

                    <img
                        src='src/images/intradayTrades.svg'
                        alt='Intraday'
                        style={{ width: "65%" }}
                    />

                    <h3 className='mt-4 fs-4'>Intraday and F&O trades</h3>

                    <p className='text-muted mt-3'>
                        Flat ₹20 or 0.03% (whichever is lower)
                        per executed order on intraday trades.
                    </p>

                </div>

                <div className='col-lg-4 mb-4'>

                    <img
                        src='src/images/pricing-eq.svg'
                        alt='Commodity'
                        style={{ width: "65%" }}
                    />

                    <h3 className='mt-4 fs-4'>Free direct MF</h3>

                    <p className='text-muted mt-3'>
                        All direct mutual fund investments are absolutely free.
                    </p>

                </div>

            </div>

        </div>

    );
}

export default Hero;