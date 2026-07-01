import React from 'react';

function Hero() {
    const handleSignup = () => {
    // Dashboard URL (Development)
    window.location.href = "http://localhost:5174/login";
  };
    return (
        <>
            <div className='container p-5 mb-5'>
                <div className='row text-center'>
                    <img src='src/images/landing.svg' alt='landing image' className=' justify-content-center text-center mb-5' style={{ width: "95%" }} />
                    <h1 className='mt-5'>
                        Invest in everything
                    </h1>
                    <p>
                        Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.
                    </p>
                    <button className='p-2 btn btn-primary fs-5 mt-3 mb-5' style={{ width: "20%", margin: "0 auto" }} onClick={handleSignup}>SignUp for free</button>
                </div>
            </div>
        </>
    );
}

export default Hero;