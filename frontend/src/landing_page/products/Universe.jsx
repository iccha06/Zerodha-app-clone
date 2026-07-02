import React from 'react';

function Universe() {

    const products = [
        {
            image: '/images/zerodhafundhouse.png',
            width: '52%',
            description:
                'Our asset management venture that is creating simple and transparent index funds to help you save for your goals.',
        },
        {
            image: '/images/sensibullLogo.svg',
            width: '58%',
            description:
                'Options trading platform that lets you create strategies, analyze positions, and examine data points easily.',
        },
        {
            image: 'https://zerodha.com/static/images/partners/tijori.svg',
            width: '38%',
            description:
                'Investment research platform that offers detailed insights on stocks, sectors, supply chains, and more.',
        },
        {
            image: '/images/streakLogo.png',
            width: '52%',
            description:
                'Systematic trading platform that allows you to create and backtest strategies without coding.',
        },
        {
            image: '/images/smallcaseLogo.png',
            width: '55%',
            description:
                'Thematic investing platform that helps you invest in diversified baskets of stocks and ETFs.',
        },
        {
            image: '/images/dittoLogo.png',
            width: '48%',
            description:
                'Personalized advice on life and health insurance. No spam and no mis-selling.',
        },
    ];

    return (
        <div className='container text-center p-5'>

            {/* Heading */}
            <h1
                className='fw-normal'
                style={{
                    fontSize: "42px",
                    color: "#424242"
                }}
            >
                The Zerodha Universe
            </h1>

            <p
                className='mt-4 text-muted'
                style={{
                    fontSize: "20px",
                    lineHeight: "1.8"
                }}
            >
                Extend your trading and investment experience even further
                with our partner platforms
            </p>

            {/* Products */}
            <div className='row mt-5 gy-5'>

                {products.map((item, index) => (

                    <div className='col-lg-4 col-md-6' key={index}>

                        <a
                            href="/"
                            className='text-decoration-none'
                        >

                            <div
                                className='p-4 universe-card'
                                style={{
                                    transition: "0.3s",
                                    cursor: "pointer",
                                    borderRadius: "12px"
                                }}
                            >

                                <img
                                    src={item.image}
                                    alt='product'
                                    className='universe-img'
                                    style={{
                                        width: item.width,
                                        minHeight: "55px",
                                        objectFit: "contain",
                                        transition: "0.3s"
                                    }}
                                />

                                <p
                                    className='text-muted mx-auto mt-4'
                                    style={{
                                        fontSize: "16px",
                                        lineHeight: "1.7",
                                        maxWidth: "300px"
                                    }}
                                >
                                    {item.description}
                                </p>

                            </div>

                        </a>

                    </div>

                ))}

            </div>

            {/* Button */}
            <button
                className='p-2 btn btn-primary fs-5 mt-3 mb-5'
                style={{
                    width: "20%",
                    margin: "0 auto"
                }}
            >
                SignUp for free
            </button>

        </div>
    );
}

export default Universe;