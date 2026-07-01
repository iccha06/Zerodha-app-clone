import React from 'react';

function LeftSec({ image, title, description, tryDemo, learnMore }) {
    return (
        <div className='container'>
            <div className='row align-items-center p-5'>

                <div className='col-6'>
                    <img src={image} alt={title} style={{ width: "90%" }} />
                </div>

                <div className='col-6'>
                    <h1 className='fs-3'>{title}</h1>

                    <p className='text-muted mt-3' style={{ lineHeight: "1.8" }}>
                        {description}
                    </p>

                    <div className='mt-4'>
                        {tryDemo && (
                            <a href='' className='me-5 text-decoration-none'>
                                {tryDemo}
                            </a>
                        )}

                        <a href='' className='text-decoration-none'>
                            {learnMore}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LeftSec;