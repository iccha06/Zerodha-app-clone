import React from 'react';

function Team() {
    return (
        <div className='container py-5'>

            {/* Heading */}
            <div className='row mb-5'>
                <div className='col text-center'>
                    <h1
                        className='fw-bold'
                        style={{ fontSize: "48px" }}
                    >
                        People
                    </h1>

                    <p
                        className='text-muted mt-3'
                        style={{ fontSize: "18px" }}
                    >
                        Meet the leadership behind Zerodha.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div
                className='row align-items-center gy-5'
                style={{ lineHeight: "2" }}
            >

                {/* Image Section */}
                <div className='col-lg-5 text-center'>

                    <img
                        src='/images/nithinKamath.jpg'
                        alt='Nithin Kamath'
                        className='img-fluid shadow'
                        style={{
                            borderRadius: "50%",
                            width: "320px",
                            height: "320px",
                            objectFit: "cover"
                        }}
                    />

                    <h3 className='mt-4 fw-semibold'>
                        Nithin Kamath
                    </h3>

                    <p
                        className='text-muted'
                        style={{ fontSize: "17px" }}
                    >
                        Founder & CEO
                    </p>

                    {/* Social Links */}
                    <div className='d-flex justify-content-center gap-4 mt-3'>

                        <a
                            href='/'
                            className='text-decoration-none'
                            style={{ color: "#387ed1" }}
                        >
                            Homepage
                        </a>

                        <a
                            href='/'
                            className='text-decoration-none'
                            style={{ color: "#387ed1" }}
                        >
                            TradingQnA
                        </a>

                        <a
                            href='/'
                            className='text-decoration-none'
                            style={{ color: "#387ed1" }}
                        >
                            Twitter
                        </a>

                    </div>

                </div>

                {/* Content Section */}
                <div className='col-lg-7'>

                    <p
                        className='text-muted'
                        style={{
                            fontSize: "17px"
                        }}
                    >
                        Nithin bootstrapped and founded Zerodha in 2010
                        to overcome the hurdles he faced during his
                        decade-long stint as a trader.
                        Today, Zerodha has transformed the landscape
                        of the Indian broking industry.
                    </p>

                    <p
                        className='text-muted'
                        style={{
                            fontSize: "17px"
                        }}
                    >
                        He is a member of the SEBI Secondary Market
                        Advisory Committee (SMAC) and the Market
                        Data Advisory Committee (MDAC).
                    </p>

                    <p
                        className='text-muted'
                        style={{
                            fontSize: "17px"
                        }}
                    >
                        Passionate about technology, finance,
                        and education, Nithin continues to
                        drive innovation in the fintech space.
                    </p>

                    {/* Quote Card */}
                    <div
                        className='p-4 mt-4 shadow-sm bg-light'
                        style={{
                            borderRadius: "18px",
                            borderLeft: "4px solid #387ed1"
                        }}
                    >

                        <p
                            className='mb-0 fst-italic text-dark'
                            style={{ fontSize: "16px" }}
                        >
                            “Playing basketball is his zen.”
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Team;
