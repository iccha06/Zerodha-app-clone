import React from 'react';

function Hero() {
    return (
        <div className='container border-bottom mb-5'>
            <div className='row text-center justify-content-center'>
                <div className='col-8 p-5'>
                    <h1 className='mt-5 fs-3'>Zerodha Products</h1>

                    <p className='mt-3 text-muted fs-5'>
                        Sleek, modern, and intuitive trading platforms
                    </p>

                    <p className='text-muted'>
                        Check out our<a href='/' style={{textDecoration:"none"}}> investment offerings →</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Hero;